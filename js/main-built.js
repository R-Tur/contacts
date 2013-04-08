/**
 * @license RequireJS text 2.0.4 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

define("text",["module"],function(e){var t,n,r=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],i=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,s=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,o=typeof location!="undefined"&&location.href,u=o&&location.protocol&&location.protocol.replace(/\:/,""),a=o&&location.hostname,f=o&&(location.port||undefined),l=[],c=e.config&&e.config()||{};t={version:"2.0.4",strip:function(e){if(e){e=e.replace(i,"");var t=e.match(s);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:c.createXhr||function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(t=0;t<3;t+=1){n=r[t];try{e=new ActiveXObject(n)}catch(i){}if(e){r=[n];break}}return e},parseName:function(e){var t,n,r,i=!1,s=e.indexOf("."),o=e.indexOf("./")===0||e.indexOf("../")===0;return s!==-1&&(!o||s>1)?(t=e.substring(0,s),n=e.substring(s+1,e.length)):t=e,r=n||t,s=r.indexOf("!"),s!==-1&&(i=r.substring(s+1)==="strip",r=r.substring(0,s),n?n=r:t=r),{moduleName:t,ext:n,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,i){var s,o,u,a=t.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===n)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},finishLoad:function(e,n,r,i){r=n?t.strip(r):r,c.isBuild&&(l[e]=r),i(r)},load:function(e,n,r,i){if(i.isBuild&&!i.inlineText){r();return}c.isBuild=i.isBuild;var s=t.parseName(e),l=s.moduleName+(s.ext?"."+s.ext:""),h=n.toUrl(l),p=c.useXhr||t.useXhr;!o||p(h,u,a,f)?t.get(h,function(n){t.finishLoad(e,s.strip,n,r)},function(e){r.error&&r.error(e)}):n([l],function(e){t.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},write:function(e,n,r,i){if(l.hasOwnProperty(n)){var s=t.jsEscape(l[n]);r.asModule(e+"!"+n,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,n,r,i,s){var o=t.parseName(n),u=o.ext?"."+o.ext:"",a=o.moduleName+u,f=r.toUrl(o.moduleName+u)+".js";t.load(a,r,function(n){var r=function(e){return i(f,e)};r.asModule=function(e,t){return i.asModule(e,f,t)},t.write(e,a,r,s)},s)}};if(c.env==="node"||!c.env&&typeof process!="undefined"&&process.versions&&!!process.versions.node)n=require.nodeRequire("fs"),t.get=function(e,t){var r=n.readFileSync(e,"utf8");r.indexOf("﻿")===0&&(r=r.substring(1)),t(r)};else if(c.env==="xhr"||!c.env&&t.createXhr())t.get=function(e,n,r){var i=t.createXhr();i.open("GET",e,!0),c.onXhr&&c.onXhr(i,e),i.onreadystatechange=function(t){var s,o;i.readyState===4&&(s=i.status,s>399&&s<600?(o=new Error(e+" HTTP status: "+s),o.xhr=i,r(o)):n(i.responseText))},i.send(null)};else if(c.env==="rhino"||!c.env&&typeof Packages!="undefined"&&typeof java!="undefined")t.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)),n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.close()}t(a)};return t}),define("text!tpl/contacts.html",[],function(){return'<div class="center">\n<% _.each(items, function(item){%> \n<div class="name" data-id=<%=item[\'id\']%> >\n  <span class="view">\n    <%=item["name"]%> \n  </span>\n  <a href="#" class="edit">Edit</a>\n</div>\n<%});%>\n<div style="float:right">\n<a href="#" class="add_contact">New Contact</a>\n</div>\n</div>\n\n \n'}),define("views/contacts",["backbone","text!tpl/contacts.html"],function(e,t){return e.View.extend({el:"body",events:{"click a.edit":"edit","click .view":"view","click a.add_contact":"add"},edit:function(t){t.preventDefault();var n=$(t.currentTarget).closest(".name").data("id");e.history.loadUrl("edit/"+n)},add:function(t){t.preventDefault(),e.history.loadUrl("add")},view:function(t){t.preventDefault();var n=$(t.currentTarget).closest(".name").data("id");e.history.loadUrl("view/"+n)},initialize:function(e){this.collection=e,this.template=_.template(t)},render:function(){return $(this.el).html(this.template({items:this.collection.toJSON()})),this}})}),define("models/contact",["backbone"],function(e){return e.Model.extend({urlRoot:"backend/contact.php",url:function(){return this.urlRoot+"?id="+this.id},initialize:function(){}})}),define("collections/contacts",["backbone","models/contact"],function(e,t){return e.Collection.extend({model:t,url:"backend/contact.php"})}),define("app/global",[],function(){return{views:{},models:{},collections:{}}}),define("controllers/contacts",["views/contacts","collections/contacts","app/global"],function(e,t,n){var r=n.collections.contacts=new t,i=n.views.contacts=new e(n.collections.contacts);return function(e){r.fetch({success:function(){i.render()}})}}),define("text!tpl/view.html",[],function(){return'<div class="center">\n<p><b>Name</b>: <%=name%></p>\n<p><b>Phone</b>: <%=phone%></p>\n<p><b>Skype</b>: <%=skype%></p>\n<p><b>Email</b>: <%=email%></p>\n<br>\n<a href="#" class="contacts">Main</a>\n<a href="#" class="edit_contact">Edit</a>\n</div>\n \n'}),define("views/view",["backbone","text!tpl/view.html"],function(e,t){return e.View.extend({el:"body",events:{"click a.contacts":"to_main","click a.edit_contact":"edit"},edit:function(t){t.preventDefault(),e.history.loadUrl("edit/"+this.model.get("id"))},to_main:function(t){t.preventDefault(),e.history.loadUrl("start")},initialize:function(e){this.model=e,this.template=_.template(t)},render:function(){return $(this.el).html(this.template(this.model.toJSON())),this}})}),define("controllers/view",["views/view","models/contact","app/global"],function(e,t,n){var r=n.models.contact=new t,i=n.views.view=new e(n.models.contact);return function(e){r.set("id",e),r.fetch({success:function(e){i.render()}})}}),define("text!tpl/edit.html",[],function(){return'<div class="center">\n<form id="edit_contact_form">\n<input type="hidden" name="id" value="<%=id%>">\n<p><b>Name</b>: <input name="name" type="text" value="<%=name%>"></p>\n<p><b>Phone</b>: <input name="phone" type="text" value="<%=phone%>"></p>\n<p><b>Skype</b>: <input name="skype" type="text" value="<%=skype%>"></p>\n<p><b>Email</b>: <input name="email" type="text" value="<%=email%>"></p>\n<br>\n<input id="save_button" type="submit" value="Save">\n<input id="delete_button" type="button" value="Delete">\n<a href="#" class="contacts">Main</a>\n</form>\n</div>'}),define("views/edit",["backbone","text!tpl/edit.html"],function(e,t){return e.View.extend({el:"body",events:{"click a.contacts":"to_main","submit #edit_contact_form":"save_contact","click #delete_button":"delete_contact"},to_main:function(t){t.preventDefault(),e.history.loadUrl("start")},delete_contact:function(t){this.model.destroy(),e.history.loadUrl("start")},save_contact:function(t){t.preventDefault();var n=this,r=$(t.target).serializeArray();return _.each(r,function(e){n.model.set(e.name,e.value)}),this.model.save(),e.history.loadUrl("view/"+this.model.get("id")),!1},initialize:function(e){this.model=e,this.template=_.template(t)},render:function(){return $(this.el).html(this.template(this.model.toJSON())),this}})}),define("controllers/edit",["views/edit","models/contact","app/global"],function(e,t,n){var r=n.models.contact=new t,i=n.views.edit=new e(n.models.contact);return function(e){r.set("id",e),r.fetch({success:function(e){i.render()}})}}),define("text!tpl/add.html",[],function(){return'<div class="center">\n<form id="add_contact_form">\n<p><b>Name</b>: <input name="name" type="text"></p>\n<p><b>Phone</b>: <input name="phone" type="text"></p>\n<p><b>Skype</b>: <input name="skype" type="text"></p>\n<p><b>Email</b>: <input name="email" type="text"></p>\n<br>\n<input id="save_button" type="submit" value="Add">\n<a href="#" class="contacts">Main</a>\n</form>\n</div>'}),define("views/add",["backbone","text!tpl/add.html"],function(e,t){return e.View.extend({el:"body",events:{"click a.contacts":"to_main","submit #add_contact_form":"save_contact"},to_main:function(t){t.preventDefault(),e.history.loadUrl("start")},save_contact:function(t){t.preventDefault();var n=this,r=$(t.target).serializeArray();return _.each(r,function(e){n.model.set(e.name,e.value)}),this.model.save(),e.history.loadUrl("start"),!1},initialize:function(e){this.model=e,this.template=_.template(t)},render:function(){return $(this.el).html(this.template()),this}})}),define("controllers/add",["views/add","models/contact","app/global"],function(e,t,n){return n.models.contact=new t,n.views.add=new e(n.models.contact),function(){n.models.contact.clear(),n.views.add.render()}}),define("app/router",["backbone","controllers/contacts","controllers/view","controllers/edit","controllers/add"],function(e,t,n,r,i){return e.Router.extend({initialize:function(){},routes:{start:"start","edit/:id":"edit","view/:id":"view",add:"add"},start:function(){t()},edit:function(e){r(e)},view:function(e){n(e)},add:function(){i()}})}),define("app/app",["backbone","app/router"],function(e,t){return{start:function(){this.router=new t,e.history.start({pushState:!0,hashChange:!1,root:"/contacts/"}),e.history.loadUrl("start")}}}),require.config({baseUrl:"js/lib/",paths:{app:"../app",views:"../views",tpl:"../../tpl",models:"../models",controllers:"../controllers",collections:"../collections",jquery:"//code.jquery.com/jquery-latest.min",backbone:"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min",underscore:"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min",text:"//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.3/text"},shim:{underscore:{exports:"_"},backbone:{deps:["underscore","jquery"],exports:"Backbone"}}}),require(["app/app"],function(e){e.start()}),define("app/boot",function(){});