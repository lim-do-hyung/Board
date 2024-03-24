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

    def resolve_boards(self, info):
        return Board.objects.all()



class CreateBoard(graphene.Mutation):
    board = graphene.Field(BoardType) # 객체 생성

    class Arguments: # 요청시에 전달되는 인자
        title = graphene.String()
        contents = graphene.String()
        writer = graphene.String()


    def mutate(self, info, title, contents, writer):
        # todo 객체에 인자로 받은 Todo필드를 주입 
        board = Board(title=title, contents=contents, writer=writer)

        #db 저장
        board.save()

        return CreateBoard(board=board)



# class UpdateTodo(graphene.Mutation):
#     todo = graphene.Field(TodoType)

#     class Arguments:
#         id = graphene.ID(required=True)
#         title = graphene.String()
#         completed = graphene.Boolean()

#     def mutate(self, info, id, title=None, completed=None):
#         # 전달받은 id로 레코드 가져옴 
#         todo = Todo.objects.get(pk=id)

#         # 기존 데이터에 덮어쓰기
#         if title is not None:
#             todo.title = title
#         if completed is not None:
#             todo.completed = completed
        
#         #db에 수정된 내용 저장
#         todo.save()
#         return UpdateTodo(todo=todo)

# class DeleteTodo(graphene.Mutation):
#     todo_id = graphene.Int()

#     class Arguments:
#         id = graphene.ID(required=True)

#     def mutate(self, info, id):
#         # 전달받은 id로 레코드 가져옴 
#         todo = Todo.objects.get(pk=id)
#         # 레코드 삭제 
#         todo.delete()
#         return DeleteTodo(todo_id=id)



class Mutation(graphene.ObjectType):
    create_board = CreateBoard.Field()
#    update_todo = UpdateTodo.Field()
#    delete_todo = DeleteTodo.Field()

schema = graphene.Schema(query=Query,  mutation=Mutation)