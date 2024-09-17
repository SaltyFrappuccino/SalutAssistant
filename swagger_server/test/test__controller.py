# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.all_task_info import AllTaskInfo  # noqa: E501
from swagger_server.models.error_response import ErrorResponse  # noqa: E501
from swagger_server.models.success_response import SuccessResponse  # noqa: E501
from swagger_server.models.task_request import TaskRequest  # noqa: E501
from swagger_server.test import BaseTestCase


class Test_Controller(BaseTestCase):
    """_Controller integration test stubs"""

    def test_salut_client_request_post(self):
        """Test case for salut_client_request_post

        
        """
        body = TaskRequest()
        response = self.client.open(
            '/SalutClientRequest',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_task_info_all_initiator_idget(self):
        """Test case for task_info_all_initiator_idget

        
        """
        response = self.client.open(
            '/taskInfo/all/{initiatorID}'.format(initiator_id='initiator_id_example'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
