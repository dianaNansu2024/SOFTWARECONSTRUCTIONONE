from django.test import TestCase
from django.contrib.auth.models import User

class UserTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")

    def test_user_list(self):
        response = self.client.get("/users/")
        self.assertEqual(response.status_code, 200)


# Create your tests here.
