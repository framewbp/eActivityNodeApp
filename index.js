const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

// var mysqlConnection = mysql.createConnection({
//     host: '119.59.96.60',
//     port: '3306',
//     user: 'testing',
//     password: 'K@t0en1712',
//     database: 'knclound_testing',
//     multipleStatements: true
// });
var mysqlConnection = mysql.createConnection({
    host: '119.59.96.60',
    port: '3306',
    user: 'eact_uat_db',
    password: 'K@t0en1712',
    database: 'eact_uat_db',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Express server is runnig at port no : ', port));

////////////////////// Validate User //////////////////////
app.post('/login', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpCode = ?;SET @PasswordHash = ?;SET @IsSuccess = ?; \
    CALL validate_login(@EmpCode ,@PasswordHash ,@IsSuccess); \
    SELECT @IsSuccess";
    mysqlConnection.query(sql, [emp.empcode, emp.passwordhash, emp.issuccess], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    let dict = element[0];
                    res.send(dict["@IsSuccess"]);
                }
            });
        else
            console.log(err);
    })
});

////////////////////// Get all employees //////////////////////
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee_tbl', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

////////////////////// Get by employees //////////////////////
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee_tbl WHERE empcode = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

////////////////////// Create User //////////////////////

app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpCode = ?;SET @FirstName = ?;SET @LastName = ?; SET @ShiftCode = ?;SET @PasswordHash = ?;SET @CreateTime = ?;SET @IsSuccess = ?; \
    CALL create_new_user(@EmpCode, @FirstName, @LastName, @ShiftCode, @PasswordHash, @CreateTime, @IsSuccess); \
    SELECT @IsSuccess";
    mysqlConnection.query(sql, [emp.empcode, emp.firstname, emp.lastname, emp.shiftcode, emp.passwordhash, emp.createtime, emp.issuccess], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    let dict = element[0];
                    res.send(dict["@IsSuccess"]);
                }
            });
        else
            console.log(err);
    })
});

////////////////////// Update User Informations //////////////////////

app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpCode = ?;SET @FirstName = ?;SET @LastName = ?; SET @ShiftCode = ?;SET @PasswordHash = ?;SET @CreateTime = ?;SET @IsSuccess = ?; \
    CALL update_user_information(@EmpCode, @FirstName, @LastName, @ShiftCode, @PasswordHash, @CreateTime, @IsSuccess); \
    SELECT @IsSuccess";
    mysqlConnection.query(sql, [emp.empcode, emp.firstname, emp.lastname, emp.shiftcode, emp.passwordhash, emp.createtime, emp.issuccess], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    let dict = element[0];
                    res.send(dict["@IsSuccess"]);
                }
            });
        else
            console.log(err);
    })
});

////////////////////// Delete an employees //////////////////////
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM  employee_tbl WHERE empcode = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

////////////////////// Get Checklist Master //////////////////////
app.get('/checklistmaster', (req, res) => {
    mysqlConnection.query('SELECT * FROM checklistmaster_tbl', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

////////////////////// Get Checklist Transport //////////////////////
app.get('/checklisttrans', (req, res) => {
    mysqlConnection.query('SELECT * FROM checklisttran_tbl', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

////////////////////// Insert Checklist Transport //////////////////////
app.post('/checklisttrans', (req, res) => {
    let checklist = req.body;
    var sql = "SET @Checklistdocno = ?;SET @Checklistno = ?;SET @Checklistdate = ?; SET @Checklisttime = ?;SET @Plateno = ?;SET @Trailerno = ?;SET @Empcode = ?;SET @Status = ?; SET @IsSuccess = ?; \
    CALL insert_checklist_trans(@Checklistdocno, @Checklistno, @Checklistdate, @Checklisttime, @Plateno, @Trailerno, @Empcode, @Status, @IsSuccess); \
    SELECT @IsSuccess";
    mysqlConnection.query(sql, [checklist.checklistdocno, checklist.checklistno, checklist.checklistdate, checklist.checklisttime, checklist.plateno, checklist.trailerno, checklist.empcode, checklist.status, checklist.issuccess], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    let dict = element[0];
                    res.send(dict["@IsSuccess"]);
                }
            });
        else
            console.log(err);
    })
});

////////////////////// Insert Checklist Transport Detail //////////////////////
app.post('/checklisttransdetail', (req, res) => {
    let checklistdetail = req.body;
    var sql = "SET @Checklistdocno = ?;SET @Checklistno = ?;SET @Checklistitemcode = ?;SET @Checklistresultbefore = ?;SET @Checklistngphotopathbefore = ?;SET @Checklistresultafter = ?;SET @Checklistngphotopathafter = ?;SET @IsSuccess = ?; \
    CALL insert_checklist_trans_detail(@Checklistdocno, @Checklistno, @Checklistitemcode, @Checklistresultbefore, @Checklistngphotopathbefore, @Checklistresultafter, @Checklistngphotopathafter, @IsSuccess); \
    SELECT @IsSuccess";
    mysqlConnection.query(sql, [checklistdetail.checklistdocno, checklistdetail.checklistno, checklistdetail.checklistitemcode, checklistdetail.checklistresultbefore, checklistdetail.checklistngphotopathbefore, checklistdetail.checklistresultafter, checklistdetail.checklistngphotopathafter, checklistdetail.issuccess], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    let dict = element[0];
                    res.send(dict["@IsSuccess"]);
                }
            });
        else
            console.log(err);
    })
});

////////////////////// Get Activity Main Master //////////////////////
app.get('/activitymainmaster', (req, res) => {
    var sql = "SELECT * FROM eact_uat_db.activitymainmaster_tbl\
    ORDER BY LENGTH(activitymaincode) , activitymaincode;"
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

////////////////////// Get Activity Sub Master //////////////////////
app.get('/activitysubmaster', (req, res) => {
    var sql = "SELECT * FROM eact_uat_db.activitysubmaster_tbl\
    ORDER BY LENGTH(activitysubcode) , activitysubcode;"
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

////////////////////// Insert Activity Transport //////////////////////
app.post('/activitytrans', (req, res) => {
    let activity = req.body;
    var sql = "SET @Activityid = ?;SET @Activitydate = ?;SET @Checklistdocno = ?; SET @Empcode = ?;SET @Shiftcode = ?;SET @Activitystatus = ?;SET @IsSuccess = ?; \
    CALL insert_activity_trans(@Activityid, @Activitydate, @Checklistdocno, @Empcode, @Shiftcode, @Activitystatus, @IsSuccess); \
    SELECT @IsSuccess";
    mysqlConnection.query(sql, [activity.activityid, activity.activitydate, activity.checklistdocno, activity.empcode, activity.shiftcode, activity.activitystatus, activity.issuccess], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    let dict = element[0];
                    res.send(dict["@IsSuccess"]);
                }
            });
        else
            console.log(err);
    })
});

////////////////////// Insert Activity Transport Detail //////////////////////
app.post('/activitytransdetail', (req, res) => {
    let activity = req.body;
    var sql = "SET @Activityid = ?;SET @Empcode = ?;SET @Actvitymaincode = ?; SET @Activitysubcode = ?;SET @Activitydate = ?;SET @Activitystarttime = ?;SET @Activityfinishtime = ?;SET @Plateno = ?;SET @Activityduration = ?;SET @Platotransportno = ?;SET @Routecode = ?;SET @IsSuccess = ?; \
    CALL insert_activity_trans_detail(@Activityid, @Empcode, @Actvitymaincode, @Activitysubcode, @Activitydate, @Activitystarttime, @Activityfinishtime, @Plateno, @Activityduration, @Platotransportno, @Routecode, @IsSuccess); \
    SELECT @IsSuccess";
    mysqlConnection.query(sql, [activity.activityid, activity.empcode, activity.actvitymaincode, activity.activitysubcode, activity.activitydate, activity.activitystarttime, activity.activityfinishtime, activity.plateno, activity.activityduration, activity.platotransportno, activity.routecode], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    let dict = element[0];
                    res.send(dict["@IsSuccess"]);
                }
            });
        else
            console.log(err);
    })
});

////////////////////// Get Towhead Master //////////////////////
app.get('/towheadmaster', (req, res) => {
    var sql = "SELECT * FROM eact_uat_db.rollingequipment_tbl\
    WHERE towhead = '1'\
    ORDER BY LENGTH(truckno) , truckno;"
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

////////////////////// Get Trailer Master //////////////////////
app.get('/trailermaster', (req, res) => {
    var sql = "SELECT * FROM eact_uat_db.rollingequipment_tbl\
    WHERE towhead = '0'\
    ORDER BY LENGTH(equipmentno) , equipmentno;"
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

////////////////////// Truck Tracking //////////////////////
app.post('/trucktracking', (req, res) => {
    let emp = req.body;
    var sql = "SET @towheadno = ?;SET @trailerno = ?;SET @startshift = ?;SET @endshift = ?;SET @currentdate = ?;SET @IsSuccess = ?; \
    CALL truck_tracking(@towheadno, @trailerno, @startshift, @endshift, @currentdate, @IsSuccess); \
    SELECT @IsSuccess";
    mysqlConnection.query(sql, [emp.towheadno, emp.trailerno, emp.startshift, emp.endshift, emp.currentdate, emp.issuccess], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    let dict = element[0];
                    res.send(dict["@IsSuccess"]);
                }
            });
        else
            console.log(err);
    })
});

////////////////////// The Idle Time //////////////////////
app.get('/idletime/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM eact_uat_db.activitysubmaster_tbl\
    where activitymaincode = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
