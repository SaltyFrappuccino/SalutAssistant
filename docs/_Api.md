# swagger_client._Api

All URIs are relative to */*

Method | HTTP request | Description
------------- | ------------- | -------------
[**task_info_all_initiator_id_get**](_Api.md#task_info_all_initiator_id_get) | **GET** /taskInfo/all/{initiatorID} | 

# **task_info_all_initiator_id_get**
> AllTaskInfo task_info_all_initiator_id_get(initiator_id)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client._Api()
initiator_id = 'initiator_id_example' # str | 

try:
    api_response = api_instance.task_info_all_initiator_id_get(initiator_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling _Api->task_info_all_initiator_id_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **initiator_id** | **str**|  | 

### Return type

[**AllTaskInfo**](AllTaskInfo.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

