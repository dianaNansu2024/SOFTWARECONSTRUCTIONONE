
from django.test import TestCase
from .models import Task

class TaskTests(TestCase):
    def setUp(self):
        self.task = Task.objects.create(title="Test Task")

    def test_task_list(self):
        response = self.client.get("/tasks/")
        self.assertEqual(response.status_code, 200)

# Create your tests here.
