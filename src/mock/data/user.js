import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
		fwtype:Mock.Random.integer(0, 1),
		paytype:Mock.Random.integer(0, 1),
		'money|300-400':1,
    sex: Mock.Random.integer(0, 1)
  }));
}
const Vipset = [];
for (let i=0;i<3;i++) {
	Vipset.push(Mock.mock({
		 id: i,
		dateM:Mock.Random.integer(1,12 ),
		"money|300-400":1
	}))
}

export { LoginUsers, Users,Vipset };
