from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class ChartApiTests(APITestCase):

    def test_candlestick_data(self):
        url = reverse('candlestick-data')  
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()['data']
        self.assertIsInstance(data, list)
        self.assertTrue(all('x' in item and 'open' in item and 'high' in item and 'low' in item and 'close' in item for item in data))

    def test_line_chart_data(self):
        url = reverse('line-chart-data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.json()['labels'], list)
        self.assertIsInstance(response.json()['data'], list)

    def test_bar_chart_data(self):
        url = reverse('bar-chart-data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.json()['labels'], list)
        self.assertIsInstance(response.json()['data'], list)

    def test_pie_chart_data(self):
        url = reverse('pie-chart-data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.json()['labels'], list)
        self.assertIsInstance(response.json()['data'], list)
