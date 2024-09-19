function getCardPath(cardName) {
    switch(cardName) {
        case 'Мои заявки':
            return '/requests';
        case 'Верификация':
            return '/verify';
        case 'VIP.Верификация':
            return '/vip-verify';
        case 'Иностранцы':
            return '/foreigners';
        case 'Нетранзикционные':
            return '/non-transactional';
        case 'Нетиповая и сверхлимитная':
            return '/conclusion-transactions';
        case 'Урегулирование задолженности':
            return '/settlement-problem-debt';
        default:
            return 'Путь не найден';
    }
}
