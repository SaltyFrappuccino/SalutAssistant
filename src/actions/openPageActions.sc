require: ../scripts/getCardPath.js

patterns:
    $AnyText = $nonEmptyGarbage

theme: /

    state: Start
        q!: $regex</start>
        a: Начнём.
        
    state: ОткрытьФОрму
        q!: (открой)
            $AnyText::anyText
        a: Открываю
            
        script:
            var form = getCardPath($parseTree._anyText)
            $response.replies = $response.replies || [];
            var body = {
                items: [{
                    command: {
                        type: "smart_app_data",
                        action: {
                            type: "OPEN_FORM",
                            payload: form
                            }
                        }
                    }]
                }
                $response.replies.push({type: 'raw', body: body});