"use strict";
const bcrypt = require('bcrypt')
const faker = require("faker");
const avatar = [
    "https://res.cloudinary.com/djdpobmlv/image/upload/v1711532192/Client/photo-1711292471935-33f01af44bca_mwhryd.jpg",
    "https://res.cloudinary.com/djdpobmlv/image/upload/v1711532164/Client/photo-1711263618908-d419b874c8f3_y19nq5.jpg",
    "https://res.cloudinary.com/djdpobmlv/image/upload/v1711532125/Client/photo-1711318741098-368efe99fe3f_yga6x4.jpg",
    "https://res.cloudinary.com/djdpobmlv/image/upload/v1711532088/Client/photo-1711367465791-5c369c862593_fkrlg5.jpg",
    "https://res.cloudinary.com/djdpobmlv/image/upload/v1711532058/Client/photo-1711210430750-66ae0698c356_qtf6sb.jpg",
    "https://res.cloudinary.com/djdpobmlv/image/upload/v1711532040/Client/photo-1711221024071-c0c934920ff0_edpopy.jpg",
    "https://res.cloudinary.com/djdpobmlv/image/upload/v1711532012/Client/photo-1711298205592-535995310152_rhl8ja.jpg",
    "https://res.cloudinary.com/djdpobmlv/image/upload/v1711531983/Client/photo-1711402905522-b90c0bc15afa_wwu4fe.jpg",
    "https://res.cloudinary.com/djdpobmlv/image/upload/v1711531946/Client/photo-1711403174834-d33851ffc786_qw9apa.jpg",
    "https://res.cloudinary.com/djdpobmlv/image/upload/v1711531879/Client/photo-1711370865063-12f626e0f7d1_sv29ts.jpg"
]


const sources = [
    "Facebook", "Tiktok", "At Restaurant"
]

const types = [
    "lead", "customer"
]

const newData = [
    [ 'Tô', 'Như', 'Phương', '2000-01-26', '59/6/12 Nguyễn Đình Chiểu, Phường 4, Quận 3, Thành phố Hồ Chí Minh', 'TmThin.Tng5@yahoo.com'],
    [ 'Hà', 'Gia', 'Hùng', '2001-01-08', '142/19 Nguyen Thi Thap, Phường Binh Thuan, Quận 7, Thành phố Hồ Chí Minh', 'DiuHnh93@yahoo.com'],
    [ 'Trần', 'Nhân', 'Từ', '2000-09-13', '18 Luy Ban Bich Street Tan Thoi Hoa Phường, Thành phố Hồ Chí Minh', 'TunHi.Phng48@gmail.com'],
    [ 'Hà', 'Lam', 'Tuyền', '2000-05-05', '98 Nguyễn Đình Chiểu, Quận 1, Thành phố Hồ Chí Minh', 'nhChiu.Trng74@yahoo.com'],
    [ 'Vương', 'Phương', 'Nghi', '1999-01-16', '298 Nguyen Trong Tuyen, Phường 1, Thành phố Hồ Chí Minh', 'ThyVn.Tng@gmail.com'],
    [ 'Đỗ', 'Bảo', 'Khánh', '2000-05-30', '18 Luy Ban Bich Street Tan Thoi Hoa Phường, Thành phố Hồ Chí Minh', 'MinhL_Lm@yahoo.com'],
    [ 'Phùng', 'Trung', 'Lực', '1998-09-21', '298 Nguyen Trong Tuyen, Phường 1, Thành phố Hồ Chí Minh', 'PhngLoan.Mai28@yahoo.com'],
    [ 'Phạm', 'Thu', 'Hằng', '2000-01-19', '142/19 Nguyen Thi Thap, Phường Binh Thuan, Quận 7, Thành phố Hồ Chí Minh', 'YnTrm.on@hotmail.com'],
    [ 'Mai', 'Quốc', 'Việt', '2000-02-27', '410 Su Van Hanh, Phường 9, Quận 10, Thành phố Hồ Chí Minh', 'HngThu83@gmail.com'],
    [ 'Lê', 'Sơn', 'Dương', '1999-01-19', '98 Nguyễn Đình Chiểu Dist1, Thành phố Hồ Chí Minh', 'ThinLng_Ng@gmail.com'],
];

const phone = [
    "0822 740 644",
    "092 150 49 74",
    "0794 494 321",
    "0584 944 008",
    "0393 959 772",
    "091 029 69 04",
    "0594 657 887",
    "0833 421 294",
    "0582 568 184",
    "0838 060 168"
]
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const clientPassword = await bcrypt.hash("client", 10) ;
        const clients = [];
        for (let i = 0; i < newData.length; i++) {
            const [firstName, middleName, lastName, birthday, address, email] = newData[i];
            const client = {
                email: email,
                phone: phone[i],
                firstname: firstName,
                lastname: lastName,
                gender: faker.random.boolean(),
                birthday: new Date(birthday),
                avatar: avatar[i],
                score: 0,
                address: address,
                source: sources[Math.floor(Math.random() * sources.length)],
                type: types[Math.floor(Math.random() * types.length)],
                hashedPassword: clientPassword,
                isRegistered: true,
                isActive: true,
                language: "vi",
                profit: faker.random.number({ min: 200000, max: 500000,  precision: 10000  }),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            clients.push(client);
        }

        for (let i = 0; i < newData.length; i++) {
            const [firstName, middleName, lastName, birthday, address, email] = newData[i];
            const client = {
                email: faker.internet.email(),
                phone: phone[i],
                firstname: firstName,
                lastname: lastName,
                gender: faker.random.boolean(),
                birthday: new Date(birthday),
                avatar: avatar[i],
                score: 0,
                address: address,
                source: sources[Math.floor(Math.random() * sources.length)],
                type: 'lead',
                hashedPassword: clientPassword,
                isRegistered: true,
                isActive: true,
                language: "vi",
                profit: faker.random.number({ min: 200000, max: 500000,  precision: 10000  }),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            clients.push(client);
        }

        for (let i = 0; i < newData.length; i++) {
            const [firstName, middleName, lastName, birthday, address, email] = newData[i];
            const client = {
                email: email,
                phone: phone[i],
                firstname: firstName,
                lastname: lastName,
                gender: faker.random.boolean(),
                birthday: new Date(birthday),
                avatar: avatar[i],
                score: 0,
                address: address,
                source: sources[Math.floor(Math.random() * sources.length)],
                type: types[Math.floor(Math.random() * types.length)],
                hashedPassword: clientPassword,
                isRegistered: true,
                isActive: true,
                language: "vi",
                profit: faker.random.number({ min: 200000, max: 500000,  precision: 10000  }),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            clients.push(client);
        }

        const admins = [
            {
                username: "manager",
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                firstname: "Manager",
                lastname: 'Manager',
                role: "manager",
                gender: faker.random.boolean(),
                birthday: faker.date.past(),
                hashedPassword: await bcrypt.hash("manager", 10),
                isActive: true,
                language: "vi",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "staff",
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                firstname: "Staff",
                lastname: 'Staff',
                role: 'employee',
                gender: faker.random.boolean(),
                birthday: faker.date.past(),
                hashedPassword: await bcrypt.hash("staff", 10),
                isActive: true,
                language: "vi",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "chef",
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                firstname: "Chef",
                lastname: 'Chef',
                role: 'chef',
                gender: faker.random.boolean(),
                birthday: faker.date.past(),
                hashedPassword: await bcrypt.hash("chef", 10),
                isActive: true,
                language: "vi",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]
        await queryInterface.bulkInsert('Clients', clients);
        await queryInterface.bulkInsert('Employees', admins);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Clients', null, {});
        await queryInterface.bulkDelete('Employees', null, {});
    },
};
