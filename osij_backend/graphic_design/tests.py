from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse

class GraphicDesignAPITests(APITestCase):
    """
    Tests for the Graphic Design API endpoints.
    """

    def test_list_public_designers(self):
        """
        Ensure that the public list of designers can be fetched without authentication.
        """
        # The URL name is defined in graphic_design/urls.py as 'public-designer-list'
        url = reverse('public-designer-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)