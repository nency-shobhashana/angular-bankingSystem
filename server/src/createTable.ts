const query = `

DROP TABLE IF EXISTS customer;
Create table customer(
        cust_id INT(5)not null AUTO_INCREMENT,
        f_name varchar(15) not null,
        l_name varchar(15) not null,
        email varchar(50) not null,
        pan_no varchar(10) not null,
        dob date not null,
        gender varchar(6) not null,
        street varchar(20) not null,
        city varchar(10) not null,
        state varchar(10) not null,
        pin INT(6) not null,
        contact BIGINT(10) not null,
        PRIMARY KEY (cust_id),
        CHECK (dob < '2020-09-28')
        );
ALTER TABLE customer AUTO_INCREMENT = 10000;

DROP TABLE IF EXISTS employee;
Create table employee(
        emp_id INT(5)not null AUTO_INCREMENT,
        f_name varchar(15) not null,
        l_name varchar(15) not null,
        dob date not null,
        gender varchar(6) not null,
        street varchar(20) not null,
        city varchar(10) not null,
        state varchar(10) not null,
        pin INT(6) not null,
        contact BIGINT(10) not null,
        PRIMARY KEY (emp_id),
        CHECK (dob < '2020-09-28')
        );
ALTER TABLE employee AUTO_INCREMENT = 10000;

DROP TABLE IF EXISTS account ;
Create table account(
        acc_no BIGINT(10)not null AUTO_INCREMENT,
        acc_type varchar(10) not null,
        acc_bal BIGINT(10) not null,
        createdDate date not null,
        cust_id INT(5),
        emp_id INT(5),
        approvedBy INT(5),
        approved BOOL,
        PRIMARY KEY (acc_no),
        FOREIGN KEY (cust_id) REFERENCES customer(cust_id),
        FOREIGN KEY (emp_id) REFERENCES employee(emp_id),
        FOREIGN KEY (approvedBy) REFERENCES employee(emp_id),
        CHECK (createdDate > '2020-09-28')
        );
ALTER TABLE account AUTO_INCREMENT = 1000000000;

DROP TABLE IF EXISTS transaction ;
create table transaction(
        trans_id BIGINT(10) not null AUTO_INCREMENT,
        trans_date date not null,
        trans_amt BIGINT(10) not null,
        trans_type varchar(10) not null,
        balance BIGINT(10) not null,
        acc_no BIGINT(10),
        PRIMARY KEY (trans_id),
        FOREIGN KEY (acc_no) REFERENCES account(acc_no)
        );
ALTER TABLE transaction AUTO_INCREMENT = 1000000000;

DROP TABLE IF EXISTS loan_account ;
create table loan_account(
            loan_id BIGINT(10) not null AUTO_INCREMENT,
            loan_type varchar(10) not null,
            interest INT(3) not null,
            duration INT(3) not null,
            amount BIGINT(10) not null,
            start_date date not null,
            remain_amt BIGINT(10) not null,
            cust_id INT(5),
            emp_id INT(5),
            authorizedBy INT(5),
            approved BOOL,
            PRIMARY KEY (loan_id),
            FOREIGN KEY (cust_id) REFERENCES customer(cust_id),
            FOREIGN KEY (emp_id) REFERENCES employee(emp_id),
            FOREIGN KEY (authorizedBy) REFERENCES employee(emp_id),
            CHECK (start_date > '2020-09-28')
            );
ALTER TABLE loan_account AUTO_INCREMENT = 1000000000;

DROP TABLE IF EXISTS payment ;
create table payment(
            pay_id BIGINT(10) not null AUTO_INCREMENT,
            pay_date date not null,
            pay_amt BIGINT(10) not null,
            loan_id BIGINT(10),
            PRIMARY KEY (pay_id),
            FOREIGN KEY (loan_id) REFERENCES loan_account(loan_id)
            );
ALTER TABLE payment AUTO_INCREMENT = 1000000000;

DROP TABLE IF EXISTS credit_card ;
create table credit_card(
        credit_id BIGINT(10) not null AUTO_INCREMENT,
        holder_name varchar(20) not null,
        credit_no BIGINT(16) not null,
        exp_date date not null,
        cvv INT(3) not null,    
        cust_id INT(5),
        PRIMARY KEY (credit_id),
        FOREIGN KEY (cust_id) REFERENCES customer(cust_id)
        );
ALTER TABLE credit_card AUTO_INCREMENT = 1000000000;

DROP TABLE IF EXISTS debit_card ;
create table debit_card(
        debit_id BIGINT(10) not null AUTO_INCREMENT,
        debit_no BIGINT(16) not null,
        holder_name varchar(20) not null,
        exp_date date not null,
        cvv INT(3) not null,
        acc_no BIGINT(10),
        PRIMARY KEY (debit_id),
        FOREIGN KEY (acc_no) REFERENCES account(acc_no)
        );
ALTER TABLE debit_card AUTO_INCREMENT = 1000000000;        

DROP TABLE IF EXISTS login ;
Create table login(
        loginId INT(5) not null AUTO_INCREMENT,
        username varchar(10) not null,
        password varchar(10) not null,
        role char(1) not null,
        cust_id INT(5),
        emp_id INT(5),
        PRIMARY KEY (loginId),
        FOREIGN KEY (cust_id) REFERENCES customer(cust_id),
        FOREIGN KEY (emp_id) REFERENCES employee(emp_id)
        );

`;