# cookbook/schema.py
import graphene
from graphene_django import DjangoObjectType

from .models import Board, Comment

class BoardType(DjangoObjectType):
    class Meta:
        model = Board

class CommentType(DjangoObjectType):
    class Meta:
        model = Comment

class Query(graphene.ObjectType):
    boards = graphene.List(BoardType)
    selectedBoard = graphene.Field(BoardType, board_id=graphene.ID())

    def resolve_boards(self, info):
        return Board.objects.all().order_by('-board_id') # -는 내림차순 정렬

    def resolve_selectedBoard(self, info, board_id):
        try:
            return Board.objects.get(board_id=board_id)
        except Board.DoesNotExist:
            return None




class CreateBoard(graphene.Mutation):
    board = graphene.Field(BoardType) # 객체 생성

    class Arguments: # 요청시에 전달되는 인자
        title = graphene.String()
        contents = graphene.String()
        writer = graphene.String()


    def mutate(self, info, title, contents, writer):
        # board 객체에 인자로 받은 Board필드를 주입 
        board = Board(title=title, contents=contents, writer=writer)

        #db 저장
        board.save()

        return CreateBoard(board=board)



class UpdateBoard(graphene.Mutation):
    board = graphene.Field(BoardType)

    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        contents = graphene.String()
        writer = graphene.String()

    def mutate(self, info, id, title, contents, writer):
        # 전달받은 id로 레코드 가져옴 
        board = Board.objects.get(pk=id)

        # 기존 데이터에 덮어쓰기
        board.title = title
        board.contents = contents
        board.writer = writer
        
        #db에 수정된 내용 저장
        board.save()
        return UpdateBoard(board=board)

class DeleteBoard(graphene.Mutation):
    board_id = graphene.Int()

    class Arguments:
        id = graphene.ID(required=True)

    def mutate(self, info, id):
        # 전달받은 id로 레코드 가져옴 
        board = Board.objects.get(pk=id)
        # 레코드 삭제 
        board.delete()
        return DeleteBoard(board_id=id)



class Mutation(graphene.ObjectType):
    create_board = CreateBoard.Field()
    update_board = UpdateBoard.Field()
    delete_board = DeleteBoard.Field()

schema = graphene.Schema(query=Query,  mutation=Mutation)