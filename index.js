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
    var sql = "SET @Checklistdocno = ?;SET @Checklistno = ?;SET @Checklistitemcode = ?;SET @Checklistresultbefore = ?;SET @Riskphotopathbefore = ?;SET @Riskmessage = ?;SET @Checklistresultafter = ?;SET @Riskphotopathafter = ?;SET @IsSuccess = ?; \
    CALL insert_checklist_trans_detail(@Checklistdocno, @Checklistno, @Checklistitemcode, @Checklistresultbefore, @Riskphotopathbefore, @Riskmessage, @Checklistresultafter, @Riskphotopathafter, @IsSuccess); \
    SELECT @IsSuccess";
    mysqlConnection.query(sql, [checklistdetail.checklistdocno, checklistdetail.checklistno, checklistdetail.checklistitemcode, checklistdetail.checklistresultbefore, checklistdetail.riskphotopathbefore, checklistdetail.riskmessage, checklistdetail.checklistresultafter, checklistdetail.riskphotopathafter, checklistdetail.issuccess], (err, rows, fields) => {
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
    let activitydetail = req.body;
    var sql = "SET @Activityid = ?; SET @Empcode = ?; SET @Activitymaincode = ?; SET @Activitysubcode = ?; SET @Activitydate = ?; SET @Activitystarttime = ?; SET @Activityfinishtime = ?; SET @Plateno = ?; SET @Trailerno = ?; SET @Activityduration = ?; SET @Platotransportno = ?; SET @Routecode = ?; SET @Msgoptional = ?; SET @IsSuccess = ?; \
    CALL insert_activity_trans_detail(@Activityid, @Empcode, @Activitymaincode, @Activitysubcode, @Activitydate, @Activitystarttime, @Activityfinishtime, @Plateno, @Trailerno, @Activityduration, @Platotransportno, @Routecode, @Msgoptional, @IsSuccess); \
    SELECT @IsSuccess";
    mysqlConnection.query(sql, [activitydetail.activityid, activitydetail.empcode, activitydetail.activitymaincode, activitydetail.activitysubcode, activitydetail.activitydate
        , activitydetail.activitystarttime, activitydetail.activityfinishtime, activitydetail.plateno, activitydetail.trailerno, activitydetail.activityduration, activitydetail.platotransportno
        , activitydetail.routecode, activitydetail.msgoptional, activitydetail.issuccess], (err, rows, fields) => {
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
    where activitymaincode = ?\
    order by length(activitysubcode)', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

////////////////////// Get Activity Sub Code //////////////////////
app.post('/getsubactivitycode', (req, res) => {
    let subactivity = req.body;
    var sql = "SET @ActivityMainCode = ?;SET @ActivitySubDescription = ?;SET @Language = ?;SET @Result = ?; \
    CALL get_sub_activity_code(@ActivityMainCode ,@ActivitySubDescription ,@Language ,@Result); \
    SELECT @Result";
    mysqlConnection.query(sql, [subactivity.activitymaincode, subactivity.actsubdescription, subactivity.language, subactivity.result], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    let dict = element[0];
                    res.send(dict["@Result"]);
                }
            });
        else
            console.log(err);
    })
});

////////////////////// Get Current Version //////////////////////
app.get('/currentversion', (req, res) => {
    mysqlConnection.query("SELECT version.version_id FROM eact_uat_db.application_current_version as version\
    where status = 'active'", [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

////////////////////// Get Current Activity No //////////////////////
app.post('/currentactivityno', (req, res) => {
    let activityno = req.body;
    var sql = "SET @Empcode = ?;SET @Currentdate = ?;SET @Currenttime = ?;SET @Shiftcode = ?;SET @Result = ?; \
    CALL get_activity_no(@Empcode ,@Currentdate ,@Currenttime ,@Shiftcode ,@Result); \
    SELECT @Result";
    mysqlConnection.query(sql, [activityno.empcode, activityno.currentdate, activityno.currenttime, activityno.shiftcode, activityno.result], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    let dict = element[0];
                    res.send(dict["@Result"]);
                }
            });
        else
            console.log(err);
    })
});

////////////////////// Get Personal Trip Allowance  //////////////////////
// app.post('/tripallowance', (req, res) => {
//     let activityno = req.body;
//     var sql = "SET @Empcode = ?;SET @Activitydate = ?;SET @Activitystarttime = ?;SET @Activityendtime = ?;\
//     SELECT * FROM eact_uat_db.v_tripallwancebasis\
//     WHERE empcode = @Empcode\
//     and activitydate = @Activitydate\
//     and activitystarttime between @Activitystarttime and @Activityendtime"
//     mysqlConnection.query(sql, [activityno.empcode, activityno.activitydate, activityno.activitystarttime, activityno.activityendtime], (err, rows, fields) => {
//         if (!err)
//             rows.forEach(element => {
//                 if (element.constructor == Array) {
//                     res.send(element);
//                 }
//             });
//         else
//             console.log(err);
//     })
// });

app.post('/tripallowance', (req, res) => {
    let tripallowance = req.body;
    var sql = "SET @Empcode = ?;SET @Activitydate = ?;SET @Activitystarttime = ?;SET @Activityendtime = ?;SET @Currentdate = ?;\
    CALL get_trip_allowance(@Empcode, @Activitydate, @Activitystarttime, Activityendtime, @Currentdate)"
    mysqlConnection.query(sql, [tripallowance.empcode, tripallowance.activitydate, tripallowance.activitystarttime, tripallowance.activityendtime, tripallowance.currentdate], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array) {
                    res.send(element);
                }
            });
        else
            console.log(err);
    })
});