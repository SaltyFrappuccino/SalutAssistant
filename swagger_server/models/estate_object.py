# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class EstateObject(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, object_type: str=None, object_cost: float=None, tb_object_name: str=None, object_region_code: str=None, currency: str=None):  # noqa: E501
        """EstateObject - a model defined in Swagger

        :param object_type: The object_type of this EstateObject.  # noqa: E501
        :type object_type: str
        :param object_cost: The object_cost of this EstateObject.  # noqa: E501
        :type object_cost: float
        :param tb_object_name: The tb_object_name of this EstateObject.  # noqa: E501
        :type tb_object_name: str
        :param object_region_code: The object_region_code of this EstateObject.  # noqa: E501
        :type object_region_code: str
        :param currency: The currency of this EstateObject.  # noqa: E501
        :type currency: str
        """
        self.swagger_types = {
            'object_type': str,
            'object_cost': float,
            'tb_object_name': str,
            'object_region_code': str,
            'currency': str
        }

        self.attribute_map = {
            'object_type': 'objectType',
            'object_cost': 'objectCost',
            'tb_object_name': 'tbObjectName',
            'object_region_code': 'objectRegionCode',
            'currency': 'currency'
        }
        self._object_type = object_type
        self._object_cost = object_cost
        self._tb_object_name = tb_object_name
        self._object_region_code = object_region_code
        self._currency = currency

    @classmethod
    def from_dict(cls, dikt) -> 'EstateObject':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The estateObject of this EstateObject.  # noqa: E501
        :rtype: EstateObject
        """
        return util.deserialize_model(dikt, cls)

    @property
    def object_type(self) -> str:
        """Gets the object_type of this EstateObject.

        Тип объекта  # noqa: E501

        :return: The object_type of this EstateObject.
        :rtype: str
        """
        return self._object_type

    @object_type.setter
    def object_type(self, object_type: str):
        """Sets the object_type of this EstateObject.

        Тип объекта  # noqa: E501

        :param object_type: The object_type of this EstateObject.
        :type object_type: str
        """

        self._object_type = object_type

    @property
    def object_cost(self) -> float:
        """Gets the object_cost of this EstateObject.

        Стоимость объекта недвижимости  # noqa: E501

        :return: The object_cost of this EstateObject.
        :rtype: float
        """
        return self._object_cost

    @object_cost.setter
    def object_cost(self, object_cost: float):
        """Sets the object_cost of this EstateObject.

        Стоимость объекта недвижимости  # noqa: E501

        :param object_cost: The object_cost of this EstateObject.
        :type object_cost: float
        """

        self._object_cost = object_cost

    @property
    def tb_object_name(self) -> str:
        """Gets the tb_object_name of this EstateObject.

        Территориальный Банк ОН  # noqa: E501

        :return: The tb_object_name of this EstateObject.
        :rtype: str
        """
        return self._tb_object_name

    @tb_object_name.setter
    def tb_object_name(self, tb_object_name: str):
        """Sets the tb_object_name of this EstateObject.

        Территориальный Банк ОН  # noqa: E501

        :param tb_object_name: The tb_object_name of this EstateObject.
        :type tb_object_name: str
        """

        self._tb_object_name = tb_object_name

    @property
    def object_region_code(self) -> str:
        """Gets the object_region_code of this EstateObject.

        Регион объекта недвижимости  # noqa: E501

        :return: The object_region_code of this EstateObject.
        :rtype: str
        """
        return self._object_region_code

    @object_region_code.setter
    def object_region_code(self, object_region_code: str):
        """Sets the object_region_code of this EstateObject.

        Регион объекта недвижимости  # noqa: E501

        :param object_region_code: The object_region_code of this EstateObject.
        :type object_region_code: str
        """

        self._object_region_code = object_region_code

    @property
    def currency(self) -> str:
        """Gets the currency of this EstateObject.

        Валюта (const=643)  # noqa: E501

        :return: The currency of this EstateObject.
        :rtype: str
        """
        return self._currency

    @currency.setter
    def currency(self, currency: str):
        """Sets the currency of this EstateObject.

        Валюта (const=643)  # noqa: E501

        :param currency: The currency of this EstateObject.
        :type currency: str
        """

        self._currency = currency
