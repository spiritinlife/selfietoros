# selfietoros

git push azure dev
git push origin dev:openshift
git push origin dev

// mongodb://iorder:redroi@ds062807.mongolab.com:62807/MongoLab-l
// usr : iorder pwd : redroi
// shell con mongo ds062807.mongolab.com:62807/MongoLab-l -u iorder -p redroi

Entities:<br>

User<br>
	-fbid<br>
Owner<br>
	-name<br>
	-afm<br>
	-*place<br>

Place<br>
	-MENU<br>
	-qrcodes<br>


Menu tha einai aplo<br>
Menu <br>
-id<br>
-array apo categories<br>
	[Category,Category,Category]<br>
	to opoion einai ena object me<br>
Category {<br>
    name : " Prwino"<br>
    array apo items <br>
    items : [Item,Item..]<br>
}
opou to item einaii ena object<br>
-Item<br>
{<br>
	price: 3<br>
	name:"Cappuchino"<br>
	options: ["metrios","sketos","glukos"]<br>
}


Interesting FrontEnd:<br>

User<br>
	-Android/Ios apps	<br>
	-Site landing Page<br>
Owner<br>
	-Android/Ios apps<br>
	-Site landing page<br>
	-Personal dashboard<br>
Place<br>
