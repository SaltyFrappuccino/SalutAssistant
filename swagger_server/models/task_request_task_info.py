# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.client import Client  # noqa: F401,E501
from swagger_server.models.deal_members_number import DealMembersNumber  # noqa: F401,E501
from swagger_server.models.estate_object import EstateObject  # noqa: F401,E501
from swagger_server.models.organization import Organization  # noqa: F401,E501
from swagger_server import util


class TaskRequestTaskInfo(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, deal_members_number: DealMembersNumber=None, client: Client=None, organization: Organization=None, estate_objects: List[EstateObject]=None):  # noqa: E501
        """TaskRequestTaskInfo - a model defined in Swagger

        :param deal_members_number: The deal_members_number of this TaskRequestTaskInfo.  # noqa: E501
        :type deal_members_number: DealMembersNumber
        :param client: The client of this TaskRequestTaskInfo.  # noqa: E501
        :type client: Client
        :param organization: The organization of this TaskRequestTaskInfo.  # noqa: E501
        :type organization: Organization
        :param estate_objects: The estate_objects of this TaskRequestTaskInfo.  # noqa: E501
        :type estate_objects: List[EstateObject]
        """
        self.swagger_types = {
            'deal_members_number': DealMembersNumber,
            'client': Client,
            'organization': Organization,
            'estate_objects': List[EstateObject]
        }

        self.attribute_map = {
            'deal_members_number': 'dealMembersNumber',
            'client': 'client',
            'organization': 'organization',
            'estate_objects': 'estateObjects'
        }
        self._deal_members_number = deal_members_number
        self._client = client
        self._organization = organization
        self._estate_objects = estate_objects

    @classmethod
    def from_dict(cls, dikt) -> 'TaskRequestTaskInfo':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The taskRequest_taskInfo of this TaskRequestTaskInfo.  # noqa: E501
        :rtype: TaskRequestTaskInfo
        """
        return util.deserialize_model(dikt, cls)

    @property
    def deal_members_number(self) -> DealMembersNumber:
        """Gets the deal_members_number of this TaskRequestTaskInfo.


        :return: The deal_members_number of this TaskRequestTaskInfo.
        :rtype: DealMembersNumber
        """
        return self._deal_members_number

    @deal_members_number.setter
    def deal_members_number(self, deal_members_number: DealMembersNumber):
        """Sets the deal_members_number of this TaskRequestTaskInfo.


        :param deal_members_number: The deal_members_number of this TaskRequestTaskInfo.
        :type deal_members_number: DealMembersNumber
        """

        self._deal_members_number = deal_members_number

    @property
    def client(self) -> Client:
        """Gets the client of this TaskRequestTaskInfo.


        :return: The client of this TaskRequestTaskInfo.
        :rtype: Client
        """
        return self._client

    @client.setter
    def client(self, client: Client):
        """Sets the client of this TaskRequestTaskInfo.


        :param client: The client of this TaskRequestTaskInfo.
        :type client: Client
        """

        self._client = client

    @property
    def organization(self) -> Organization:
        """Gets the organization of this TaskRequestTaskInfo.


        :return: The organization of this TaskRequestTaskInfo.
        :rtype: Organization
        """
        return self._organization

    @organization.setter
    def organization(self, organization: Organization):
        """Sets the organization of this TaskRequestTaskInfo.


        :param organization: The organization of this TaskRequestTaskInfo.
        :type organization: Organization
        """

        self._organization = organization

    @property
    def estate_objects(self) -> List[EstateObject]:
        """Gets the estate_objects of this TaskRequestTaskInfo.

        Объекты недвижимости  # noqa: E501

        :return: The estate_objects of this TaskRequestTaskInfo.
        :rtype: List[EstateObject]
        """
        return self._estate_objects

    @estate_objects.setter
    def estate_objects(self, estate_objects: List[EstateObject]):
        """Sets the estate_objects of this TaskRequestTaskInfo.

        Объекты недвижимости  # noqa: E501

        :param estate_objects: The estate_objects of this TaskRequestTaskInfo.
        :type estate_objects: List[EstateObject]
        """

        self._estate_objects = estate_objects
