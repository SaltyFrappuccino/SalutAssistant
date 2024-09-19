require: ../scripts/createRequest.js

patterns:
    $AnyText = $nonEmptyGarbage

theme: /

    state: Start
        q!: $regex</start>
        a: Начнём.

    state: ConclusionTransactions_done
        event!: ConclusionTransactions_done
        script:
            var formState = $request.data.eventData.form;
            var result = createRequest(formState, "CONCLUSION_TRANSACTIONS_DONE");

            $response.replies = $response.replies || [];
            if (result && result.status === 200) {
                $response.replies.push({
                    type: "text",
                    text: "Операция по завершению транзакций успешно завершена."
                });
            } else {
                $response.replies.push({
                    type: "text",
                    text: "Ошибка: " + result.error || "Неизвестная ошибка."
                });
            }

    state: Foreigners_done
        event!: Foreigners_done
        script:
            var formState = $request.data.eventData.form;
            var result = createRequest(formState, "FOREIGNERS_DONE");

            $response.replies = $response.replies || [];

            if (result && result.status === 200) {
                $response.replies.push({
                    type: "text",
                    text: "Операция для иностранцев успешно завершена."
                });
            } else {
                $response.replies.push({
                    type: "text",
                    text: "Ошибка: " + result.error || "Неизвестная ошибка."
                });
            }

    state: NonTransactionalRequest_done
        event!: NonTransactionalRequest_done
        script:
            var formState = $request.data.eventData.form;
            var result = createRequest(formState, "NON_TRANSACTIONAL_REQUEST_DONE");

            $response.replies = $response.replies || [];

            if (result && result.status === 200) {
                $response.replies.push({
                    type: "text",
                    text: "Нетранзакционный запрос успешно обработан."
                });
            } else {
                $response.replies.push({
                    type: "text",
                    text: "Ошибка: " + result.error || "Неизвестная ошибка."
                });
            }

    state: Registers_done
        event!: Register_done
        script:
            var formState = $request.data.eventData.form;
            var result = createRequest(formState, "REGISTERS_DONE");

            $response.replies = $response.replies || [];

            if (result && result.status === 200) {
                $response.replies.push({
                    type: "text",
                    text: "Реестры успешно обновлены."
                });
            } else {
                $response.replies.push({
                    type: "text",
                    text: "Ошибка: " + result.error || "Неизвестная ошибка."
                });
            }

    state: SettlementOfProblemDebt_done
        event!: SettlementOfProblemDebt_done
        script:
            var formState = $request.data.eventData.form;
            var result = createRequest(formState, "SETTLEMENT_OF_PROBLEM_DEBT_DONE");

            $response.replies = $response.replies || [];

            if (result && result.status === 200) {
                $response.replies.push({
                    type: "text",
                    text: "Проблемная задолженность успешно урегулирована."
                });
            } else {
                $response.replies.push({
                    type: "text",
                    text: "Ошибка: " + result.error || "Неизвестная ошибка."
                });
            }