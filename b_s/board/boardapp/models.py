from django.db import models

class Board(models.Model):
    board_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    contents = models.TextField()
    writer = models.CharField(max_length=50)
    c_date = models.DateField(auto_now_add=True)
    m_date = models.DateField(auto_now=True)
    views = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    comment = models.TextField()
    writer = models.CharField(max_length=50)
    c_date = models.DateField(auto_now_add=True)
    m_date = models.DateField(auto_now=True)

    def __str__(self):
        return f"Comment by {self.writer}"
