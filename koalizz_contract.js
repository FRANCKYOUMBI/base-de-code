/*https://api.development.koalizz.fr/api/v1/pre-registrations/create/owner
Request Method:POST
authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjEzMTcyOTgsInN1YiI6ImM4MzUyNWVlLTc2NTYtNDVmMy05OWMxLWMzNWIwNWE0ZTk4MCJ9.CCO39iQpdZWZP_wNGvqTgCeNDJjA71w5ScN38Ao1M2g
{
  "pre_contract":{
    "begin_date":"2024-11-01",
      "end_date":"2025-01-31",
      "typical_weeks":[
      [
        [
        ],
        [
          {
            "to_time":"15:00",
            "from_time":"07:00"
          }
        ],
        [
          {
            "to_time":"17:30",
            "from_time":"12:00"
          }
        ],
        [
        ],
        [
          {
            "to_time":"14:30",
            "from_time":"09:00"
          }
        ]
      ]
    ],
      "type":"REGULAR",
      "occasional_days":[
    ]
  },
}*/
const { fakerFR } = require('@faker-js/faker');

fakerFR.seed(60);

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// with faker create 20 random data and post to api
const data = Array.from({ length: 20 }, () => {
  const randomBirthdate = fakerFR.date.between({
    from: '2023-01-01T00:00:00.000Z',
    to: '2024-12-31T00:00:00.000Z',
  });
  const lastName = fakerFR.person.lastName();

  const beginDate = fakerFR.date.between({
    from: '2024-10-27T00:00:00.000Z',
    to: '2025-03-30T00:00:00.000Z',
  });
  const endDate = new Date(beginDate);
  endDate.setDate(
    beginDate.getDate() + fakerFR.number.int({ min: 20, max: 500 }),
  );
  return {
    child: {
      firstname: fakerFR.person.firstName(),
      lastname: lastName,
      gender: fakerFR.helpers.arrayElement(['MALE', 'FEMALE']),
      birthdate: formatDate(randomBirthdate),
      birthplace: fakerFR.location.city(),
    },
    nurseries: ['056103ac-d6f6-43da-8a68-f9d8f8fada89'],
    pre_contract: {
      begin_date: formatDate(beginDate),
      end_date: formatDate(endDate),
      typical_weeks: Array.from(
        { length: fakerFR.helpers.arrayElement([1, 2]) },
        () => {
          return Array.from({ length: 5 }, () => {
            if (fakerFR.datatype.boolean(0.3)) return [];
            return [
              {
                from_time: `${String(fakerFR.number.int({ min: 7, max: 12 })).padStart(2, '0')}:00`,
                to_time: `${String(fakerFR.number.int({ min: 13, max: 17 })).padStart(2, '0')}:00`,
              },
            ];
          });
        },
      ),
    },
    note: fakerFR.lorem.sentence(),
    parents: Array.from(
      { length: fakerFR.helpers.arrayElement([1, 2, 2, 2]) },
      () => {
        const firstName = fakerFR.person.firstName();
        return {
          link: fakerFR.helpers.arrayElement([
            'MOTHER',
            'FATHER',
            'SISTER',
            'BROTHER',
            'AUNT',
            'UNCLE',
            'STEPMOTHER',
            'STEPFATHER',
            'GRANDMOTHER',
            'GRANDFATHER',
            'TUTORF',
            'TUTORM',
            'OTHER',
          ]),
          firstname: firstName,
          lastname: lastName,
          birthplace: fakerFR.location.city(),
          fix_phone: fakerFR.phone.number({ style: 'national' }),
          phone: fakerFR.phone.number({ style: 'international' }),
          email: fakerFR.internet.email({
            firstName: firstName,
            lastName: lastName,
            provider: fakerFR.helpers.arrayElement([
              'yahoo.com',
              'hotmail.com',
            ]),
          }),
          recipient_number: String(
            fakerFR.number.int({
              min: 1000000,
              max: 9999999,
            }),
          ),
          zip_code: fakerFR.location.zipCode(),
          address: fakerFR.location.streetAddress(),
          city: fakerFR.location.city(),
          country: fakerFR.location.country(),
          profession: fakerFR.person.jobTitle(),
          annual_income: fakerFR.finance.amount({
            min: 28000,
            max: 120000,
          }),
          company_name: fakerFR.company.name(),
          has_company_contract: fakerFR.datatype.boolean(),
          dependent_children: fakerFR.number.int({ min: 1, max: 5 }),
          disabled_children: fakerFR.number.int({ min: 0, max: 2 }),
        };
      },
    ),
  };
});

// console.log(JSON.stringify({ data }, null, 2));

for (const item of data) {
  //   using fetch to post data
  fetch(
    'https://api.staging.koalizz.fr/api/v1/pre-registrations/create/owner',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjE0NzM0NzgsInN1YiI6IjdmYmFkYzkzLTQ5YjctNGU1Yy1iZjkzLWQ0YzNjOTAwYjQyMiJ9.aDMxIL5a_ikn9QZscze2o3Y4M_f8T1J2sMige0VvXg8',
      },
      body: JSON.stringify(item),
    },
  )
    .then((response) => response.json())
    .then((data) => console.log(JSON.stringify(data, null, 2)))
    .catch((error) => console.error('Error:', error));
}
