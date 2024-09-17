function createRequest(formState, type) {
    
    var url = 'https://example.com/api'; // Замените URL

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json'); 

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { 
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            }
        }
    };

    xhr.onerror = function () {
        reject('Ошибка сети или запроса');
    };

    xhr.send(JSON.stringify(formState));
    
    switch (type) {
        case "CONCLUSION_TRANSACTIONS_DONE":
            // Логика отправки запроса для завершения транзакций
            return { status: 200, body: {} }; // Пример успешного ответа
        case "FOREIGNERS_DONE":
            // Логика отправки запроса для иностранцев
            return { status: 200, body: {} };
        case "NON_TRANSACTIONAL_REQUEST_DONE":
            // Логика для нетранзакционных запросов
            return { status: 200, body: {} };
        case "REGISTERS_DONE":
            // Логика для обновления реестров
            return { status: 200, body: {} };
        case "SETTLEMENT_OF_PROBLEM_DEBT_DONE":
            // Логика для урегулирования проблемной задолженности
            return { status: 200, body: {} };
        default:
            return { status: 400, error: "Неизвестный тип запроса." };
   
}
}
