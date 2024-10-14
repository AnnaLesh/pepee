async function fetchUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Пользователь не найден');
            }
            throw new Error('Ошибка при получении данных пользователя');
        }

        const data = await response.json();

        const user = {
            telegram_id: data.telegram_id,
            username: data.username,
            balance: data.balance,
            profile_image: data.profile_image,
            profit_per_hour: data.profit_per_hour,
            level: {
                name: data.level.name,
                image: data.level.image,
            },
            referrals: data.referrals.map(referral => ({
                telegram_id: referral.telegram_id,
                username: referral.username,
                profile_image: referral.profile_image,
                earn: referral.earn,
            })),
        };

        return user;
    } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
    }
}

async function fetchUsers() {
    try {
        const response = await fetch('/api/users');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const users = await response.json();

        const formattedUsers = users.map(user => ({
            telegram_id: user.telegram_id,
            username: user.username,
            balance: user.balance,
            profile_image: user.profile_image,
            profit_per_hour: user.profit_per_hour,
        }));

        console.log(formattedUsers);
        return formattedUsers;
    } catch (error) {
        console.error('Ошибка при fetching users:', error);
    }
}
async function buyProfitPerTap(userId) {
    try {
        const response = await fetch(`/api/users/${userId}/buyProfitPerTap`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.message === 'ok') {
            return {
                message: data.message,
                changedBalance: data.changedBalance,
                changedProfitPerTap: data.changedProfitPerTap
            };
        } else if (data.message === 'Insufficient balance') {
            throw new Error('Недостаточно средств для покупки');
        } else {
            throw new Error('Неизвестная ошибка');
        }
    } catch (error) {
        console.error('Ошибка при покупке прокачки:', error);
        return { message: 'Ошибка при покупке прокачки' };
    }
}
async function tap(userId) {
    try {
        const response = await fetch(`/api/users/${userId}/tap`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.message === 'ok') {
            return {
                message: data.message,
                changedBalance: data.changedBalance
            };
        } else {
            throw new Error('Неизвестная ошибка');
        }
    } catch (error) {
        console.error('Ошибка при выполнении тапания:', error);
        return { message: 'Ошибка при выполнении тапания' };
    }
}

const main = () => {
    fetchUser(1)
}
main()