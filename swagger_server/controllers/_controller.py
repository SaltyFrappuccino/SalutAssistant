import connexion
import six

from swagger_server.models.all_task_info import AllTaskInfo  # noqa: E501
from swagger_server.models.error_response import ErrorResponse  # noqa: E501
from swagger_server.models.success_response import SuccessResponse  # noqa: E501
from swagger_server.models.task_request import TaskRequest  # noqa: E501
from swagger_server import util


def salut_client_request_post(body):  # noqa: E501
    """salut_client_request_post

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: SuccessResponse
    """
    if connexion.request.is_json:
        body = TaskRequest.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def task_info_all_initiator_idget(initiator_id):  # noqa: E501
    """task_info_all_initiator_idget

     # noqa: E501

    :param initiator_id: 
    :type initiator_id: str

    :rtype: AllTaskInfo
    """
    return 'do some magic!'
