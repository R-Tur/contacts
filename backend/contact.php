<?php$db = new PDO('sqlite:contacts.sqlite3');$db->query("CREATE TABLE IF NOT EXISTS `contact` (  `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,  `name` varchar(20) NOT NULL,  `phone` varchar(20),  `skype` varchar(20),  `email` varchar(20));");$request = json_decode(file_get_contents('php://input'), true);$id      = $_REQUEST["id"];switch ($_SERVER['REQUEST_METHOD']) { case 'PUT':  rest_put($request);  break; case 'POST':  rest_post($request);  break; case 'GET':  rest_get($id);  break; case 'DELETE':  rest_delete($id);  break; default:  rest_error($request);  break;}function rest_get($id) { if ($id == "undefined")  return false; global $db; if (!$id) {  $query  = "select * from contact";  $result = $db->query($query);  $res    = Array();  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {   $res[] = $row;  }  die(json_encode($res)); } $query  = "select * from contact where id=$id"; $result = $db->query($query); $res    = Array(); if ($row = $result->fetch(PDO::FETCH_ASSOC))  die(json_encode($row));}function rest_put($request) { global $db; if (trim($request['name']) === '')  return false; $result = $db->query("UPDATE contact set name='{$request['name']}', skype='{$request['skype']}',email='{$request['email']}', phone='{$request['phone']}' WHERE id={$request['id']}");}function rest_post($request) { global $db; if (trim($request['name']) === '')  return false; $result = $db->query("INSERT INTO contact(`name`,`skype`,`email`,`phone`) VALUES('{$request['name']}','{$request['skype']}','{$request['email']}', '{$request['phone']}');");}function rest_delete($id) { global $db; $result = $db->query("DELETE FROM contact WHERE id=$id;");}function rest_error($request) {}?>