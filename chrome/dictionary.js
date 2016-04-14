/*
Copyright Nikolay Avdeev aka NickKolok aka Николай Авдеев 2015

Всем привет из снежного Воронежа! 

This file is part of CHAS-CORRECT.

    CHAS-CORRECT is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    CHAS-CORRECT is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with CHAS-CORRECT.  If not, see <http://www.gnu.org/licenses/>.

  (Этот файл — часть CHAS-CORRECT.

   CHAS-CORRECT - свободная программа: вы можете перераспространять её и/или
   изменять её на условиях Стандартной общественной лицензии GNU в том виде,
   в каком она была опубликована Фондом свободного программного обеспечения;
   либо версии 3 лицензии, либо (по вашему выбору) любой более поздней
   версии.

   CHAS-CORRECT распространяется в надежде, что она будет полезной,
   но БЕЗО ВСЯКИХ ГАРАНТИЙ; даже без неявной гарантии ТОВАРНОГО ВИДА
   или ПРИГОДНОСТИ ДЛЯ ОПРЕДЕЛЕННЫХ ЦЕЛЕЙ. Подробнее см. в Стандартной
   общественной лицензии GNU.

   Вы должны были получить копию Стандартной общественной лицензии GNU
   вместе с этой программой. Если это не так, см.
   <http://www.gnu.org/licenses/>.)
*/
'use strict';

var oldTime = Date.now();

var sya="(?=(?:ся|)(?:[^А-Яа-яЁёA-Za-z]|^|$))";
var ca="[цc]+[ао]";

var orphoWordsToCorrect=[
/*
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
*/

	["как-*правило","как правило"],
	["по-*которой","по которой"],//Да, и такое бывает. TODO: просклонять
	["про-*запас","про запас"],
	["свечь","свеч"],
	["н[ао]-*[ао]б[ао]рот","наоборот"],

	["иметь в-*виду","иметь в виду"],
	["имею в-*виду","имею в виду"],
	["имеем в-*виду","имеем в виду"],
	["имеешь в-*виду","имешь в виду"],
	["имеете в-*виду","имеете в виду"],
	["имеет в-*виду","имеет в виду"],
	["имел в-*виду","имел в виду"],
	["имела в-*виду","имела в виду"],
	["имели в-*виду","имели в виду"],
	["имеешь в-*виду","имешь в виду"], //[Katzen Gott]: вроде всё
	
	["в-*сч[ёе]т","в счёт"],
	["в-*случае","в случае"],
	["в-*виде","в виде"],
	["в-*целом","в целом"],
	["в[\\s-]*принц[иеы]п[еи]","в принципе"],
	["в-*смысле","в смысле"],
	["в-*первую","в первую"],
	["в-*о+бщем","в общем"],
	["в[\\s-]*конце[\s-]*то[\\s-]*концов","в конце-то концов"],
	["в[\\s-]*конце[\\s-]*концов","в конце концов"],
	["конце-*концов","конце концов"],
	["в[\\s-]*том[\\s-]*то[\\s-]*и[\\s-]*дело","в том-то и дело"],
	["во-*скоко","во сколько"],

	["в[\\s-]+кратце","вкратце"],
	["во-время","вовремя"],
	["в[\\s-]+догонку","вдогонку"],
	["во внутрь","вовнутрь"],
	["в расплох","врасплох"],
	["в догонку","вдогонку"],//TODO: почистить
	["в догонку","вдогонку"],
	["во первых","во-первых"],
	["в[\\s-]*част*ности","в частности"],
	
	["кое[\\s]*где","кое-где"],//TODO: аналоги
	["кое[\\s]*кто","кое-кто"],
	["кое[\\s]*что","кое-что"],
	["кое[\\s]*кого","кое-кого"],
	["кое[\\s]*кому","кое-куда"],//[Katzen Gott]: может быть "кое-к", "кое-г" и "кое-ч" префиксами сделать? А то очень много получается.
	["кое[\\s]*как","кое-как"], //TODO: аналоги
	
	["по-круче","покруче"],
	["по-надежнее","понадежнее"],
	["по-крупнее","покрупнее"],
	["по-подробнее","поподробнее"],
	["по-лучь*ше","получше"],
	["по[-]больше","побольше"],
	["по-меньше","поменьше"],
	["по-скорее","поскорее"],
	["по-началу","поначалу"],
	["по[\s-]немногу","понемногу"],
	["по[\\s-]+наслышке","понаслышке"],
	["по[\\s-]+пугай","попугай"],
	["по[\\s-]+тихоньку","потихоньку"],
	["по-мимо","помимо"],
	["по-этому","поэтому"],
	["по-ходу","походу"],
	["по возражав","повозражав"],
	
	["по\\s*русски","по-русски"],
	["по\\s*аглийски","по-английски"],
	["по[\\s]*английски","по-английски"],//TODO: другие языки
	["по[\\s]*французски","по-французски"],
	["по[\\s]*немецки","по-немецки"],
	["по[\\s]*украински","по-украински"],
	
	["потвоему","по-твоему"],// По твоему мнению
	["по-*мо[ей]му","по-моему"],
	["по\\s*товарищески","по-товарищески"],
	["по\\s*обывательски","по-обывательски"],
	["погеройски","по-геройски"],
	["по женски","по-женски"],
	["п[ао]любому","по-любому"],
	["по[\\s-]*собачь*и","по-собачьи"],
	
	//То, что никогда не пишется с "по" слитно или дефисно, а только раздельно
	//В основном по+существительное
	["по-сети","по сети"],// Посетить
	["по-*идее","по идее"],
	["по-*сути","по сути"],
	["по-*факту","по факту"],
	["по-*делу","по делу"],
	["по-*поводу","по поводу"],
	["по-*возможности","по возможности"],
	["по-*отдельности","по отдельности"],
	["по-*аналогии","по аналогии"],
	["по-*минимуму","по минимуму"],
	["по-*максимуму","по максимуму"],
	["по-*умолчанию","по умолчанию"],
	["по-*соседству","по соседству"],
	["по-*привычке","по привычке"],
	["по-новой","по новой"],
	["по-*крайней","по крайней"],
	["по-русскому","по русскому"],
	["по-полной","по полной"],
	["по-старинке","по старинке"],
	["по-ходу","походу"],
	["по-*слухам","по слухам"],
	["по-*молодости","по молодости"],
	["по[\\s-]*ди[ао]г[ао]нал[еи]","по диагонали"],
	["по-*порядку","по порядку"],
	["по-*возможности","по возможности"],
//	["по-интересному","по интересному"],//По-хорошему?
/*
	["",""],
	["",""],
	["",""],
	["",""],
*/
	["пол[\\s-]+кило","полкило"],
	["пол[\- ]часа","полчаса"],
	["пол-*года","полгода"],
	["поллитра","пол-литра"],
	["полэкрана","пол-экрана"],
	
	["не-*был","не был"],
	["не-*была","не была"],
	["не-*было","не было"],
	["не-были","не были"],// Небыль
	
	["немогли","не могли"],//TODO: окончания
	["немогу","не могу"],
	["несможешь*","не сможешь"],
	["нехоц+а","не хочется"],
	["нехочу","не хочу"],
	["н[еи]знаю","не знаю"],
	["недай","не дай"],
	["незавалялся","не завалялся"],
	["невлезает","не влезает"],
	["недействует","не действует"],
	["неповеришь","не поверишь"],
	["н[ие]люблю","не люблю"],
	["неработает","не работает"],
	["не-*спеша","не спеша"],
	["не-*совсем","не совсем"], //TODO: почистить
	["не\\s-]*совсем","не совсем"],
	["н[еи]-*надо","не надо"],
	["ни-*черта","ни черта"],
	["не-*зря","не зря"],
	["н[ие][фв]курс[ие]","не в курсе"],
	["незачто","не за что"],
	["неначем","не на чем"],
	["не[\\s-]*при[\\s-]*ч[еёо]м","не при чем"],
	["ни[\\s-]*при[\\s-]*ч[еёо]м","ни при чём"],//Да, это два разных!
	["н[еи][ -]*в[ -]*ко[еи]м случа[еи]","ни в коем случае"],
	["ни[\\s-]*за[\\s-]*что","ни за что"],
	["никчему","ни к чему"],
	["ниразу","ни разу"],
	["не[\\s-]гоже","негоже"],
	["н[еи][\\s-]+ужели","неужели"],
	["не[\\s-]*охото","неохота"], //TODO: почистить
	["не-охота","неохота"],
	["н[еи][\\s-]*мно[жшщ]ь*к[ао]*","немножко"],
	["н[ие][\\s-]*оч[ие]нь","не очень"],

	
	["кудаж","куда ж"],
	["таже","та же"],
	["тотже","тот же"],
	["те-*же","те же"],//TODO: допросклонять
	["всеже","все же"],
	["всёже","всё же"],
	["все-*ж","все ж"],
	["всё-*ж","всё ж"],
	["что-*ж","что ж"],
	["это-ж","это ж"], //TODO: почистить
	["это-*ж","это ж"],
	["такойже","такой же"],//TODO: просклонять
	["чтоже","что же"],
	["какую-*ж","какую ж"],
	["какая-*ж","какая ж"],
	["какой-*ж","какой ж"],


	["надо-*бы","надо бы"],
	["какбы","как бы"],
	["хотя-*бы","хотя бы"],
	["жалбы","жал бы"], //[Katzen Gott]: похоже на опечатку в слове "жалобы". Я бы убрала, но если это реально частая ошибка, то пусть.
	["былобы","было бы"],
	["гдебы","где бы"],
	["вроде-*бы","вроде бы"],
	["выб","вы б"],
	["яб","я б"],
	["лучш[еи][\\s-]*б","лучше б"],
	
	["что[\\s-]*ле","что ли"],
	["штол[еь]","что ли"],
	["что-*ль","что ль"],//TODO: просклонять
	["чуть-*ли","чуть ли"],
	["вря[дт]-*ли","вряд ли"],
	
	["зачемто","зачем-то"],
	["во+бще-*то","вообще-то"],
	["почемуто","почему-то"],
	["какую-*т[уоа]","какую-то"],
	["какайа-*то","какая-то"],
	["чьято","чья-то"],
	["чтото","что-то"],
	["ктото","кто-то"],
	["какойт[ао]","какой-то"],//TODO: допросклонять
	["какиет[ао]","какие-то"],
	["какаят[ао]","какая-то"],
	["наконецто","наконец-то"],
	["наконецтаки","наконец-таки"],
	["вс[её]таки","всё-таки"],
	
	["куда-*как","куда как"],
	["потому-как","потому как"],
	["так-*как","так как"],
	["так-*что","так что"],
	["потомучто","потому что"],
	["потому-что","потому что"],
	
	["где-*угодно","где угодно"],
	["как-*только","как только"],
	["тем-*более","тем более"],
	["рука[\\s-]*об[\\s-]*руку","рука об руку"],
	["до-*свидания","до свидания"],
	["до-*свиданья","до свиданья"],
	["на-лету","на лету"],//налёт не обижать!
	["всего[\\s-]*лишь","всего лишь"],
	["б[еи][сз][\\s-]*п[оа]нят[ие]я","без понятия"],
	["как[\\s-]*н[ие][\\s-]*в[\\s-]*ч[еёо]м[\\s-]*н[еи][\\s-]*бывало","как ни в чем не бывало"],
	["к-*стат[еи]","кстати"],
	["как-*раз","как раз"],
	["дада","да-да"],
	["буд-то","будто"],
	["то-*есть","то есть"],
	["при-*встрече","при встрече"],
	["под-дых","под дых"],
	["на[\\s-]*р[ао]вне","наравне"],
	["досвидание","до свидания"],
	["скем","с кем"],
	["на[\\s-]тощак","натощак"],
	["подругому","по-другому"],
	["на последок","напоследок"],
	["вс[её]-*время","всё время"],
	["ка[кг]-*бу[дт]то","как будто"],
	["что-бы","чтобы"],
	["што-бы","чтобы"],
	["вс[её]-*равно","всё равно"],
	["тобишь","то бишь"],
	["из *за","из-за"], //TODO: почистить
	["из за","из-за"],
	["изза","из-за"],
	["из *под","из-под"],
	["и[зс][- ]*под[- ]*лобья","исподлобья"],
	["и[зс][ -]*д[ао]л[еи]ка","издалека"],
	["докучи","до кучи"],
	["сомной","со мной"],
	["чтоли","что ли"],
	["накого","на кого"],
	
	["молодеж","молодежь"],
	["помоч","помочь"],
	["измениш","изменишь"],
	["тысячь","тысяч"],
	["душь","душ"],
	["п[ао]дреж","подрежь"],//TODO: приставки
	["слыш","слышь"],
	["финишь","финиш"],
	["дрож","дрожь"],
	["ключь","ключ"],
	["ноч","ночь"],
	["будеть","будет"],
	["делаеть","делает"],
	["взятся","взяться"],
	["поменятся","поменяться"],
	["мерится","мериться"],
	["мерятся","меряться"],
	["имется","иметься"],//Поднимется 
	["грится","говорится"],
	["учаться","учатся"],//Но обучаться
	["общатся","общаться"],//Приобщатся
	["юнный","юный"],//не могу в префиксы, есть "юннат"
	["юнного","юного"],//больше 54 000
	["юнному","юному"],//больше 12 000
	["юнным","юным"],//больше 20 700
	["юнном","юном"],//больше 16 000
	["юнная","юная"],//больше 200 000. С женским родом проблема. Есть имя Юнна
	["юнную","юную"],//больше 82 00
	["юнные","юные"],//больше 367 000
	["юнных","юных"],//больше 290 000
	["юнными","юными"],//больше 20 000


/*
	[""+ca,""],
	[""+ca,""],
	[""+ca,""],
	[""+ca,""],
*/
	["мы"+ca,"мыться"],//TODO: приставки. В постфиксы нельзя - слишком коротко
	["найд[её]"+ca,"найдётся"],
	["занят*"+ca,"заняться"],
	["научи"+ca,"научиться"],//"а чем легче научица?", аналогичная ситуация. "Он научица!"  ("Он научится!")
	["пяли"+ca,"пялится"],
	["просну"+ca,"проснуться"],
	["меняю"+ca,"меняются"],
	["каже"+ca,"кажется"],
	["верит"+ca,"верится"],
	["кати"+ca,"катиться"],
	["с[чщ]а[зс]*","сейчас"],
	["станови"+ca,"становится"],
	["валя"+ca,"валяться"],
	["валяю"+ca,"валяются"],
	["оста[её]"+ca,"остаётся"],
	["рытся","рыться"],
	["напится","напиться"],
	["добится","добиться"],
	["режеться","режется"],
	["померять*ся","помериться"],
	["мерять*cя","мериться"],
	["менятся","меняться"],
	["грю","говорю"],//TODO: проспрягать //[Katzen Gott]: грит не трогать — единица измерения зернистости
	["сьедал","съедал"],
	["сьедала","съедала"],
	["сьедает","съедает"], // больше 109 000
	["сьедаю","съедаю"], // больше 73 000
	["сьедает","съедает"], // больше 109 000
	["сьедают","съедают"], // больше 36 000
	["сьедят","съедят"], //больше 57 000
	["сьешь","съешь"], //больше 101 000
	["сьедим","съедим"], //больше 20 000
	["сьест","съест"], //больше 97 000
	["сьем","съем"], //больше 300 000, сложность. Может быть проблема со словом "съём"



	["весчь*","вещь"],
	["тыщу","тысячу"],
	["тыщи","тысячи"],
	["тыщ","тысяч"],
//?	["чесслово","честное слово"],
	["ес+-н+о","естественно"],
	["ес+е*с*т*н[оа]","естественно"],
	["со[бп]с+т*н[оа]","собственно"],
	["ч[ёо]","что"],
	["н[ие]ч[ёео]","ничего"],
	["кста","кстати"],
//	["счас","сейчас"],
//	["грит","говорит"],//TODO: добить окончаниями [Katzen Gott]: грит — единица измерения зернистости
	["шо","что"],
	["шт*об","чтоб"],
	["знач","значит"],
	["корочь*","короче"],
	["ч[еоё]-нить","что-нибудь"],
	["ч[оеё][\\s-]*нибу[дт]ь","что-нибудь"],
	["д[ао]фига","очень много"],//Ибо нефиг!
	["ч[ёое]-*то","что-то"],//TODO: дополнить!
	["как-*нить","как-нибудь"],
	["кто-*нить","кто-нибудь"],//TODO: допросклонять!
	["что-*нить","что-нибудь"],//TODO: допросклонять!
	["ч[оё]нить","что-нибудь"],//Как отличить от "чинить", не знаю
	["что[\\s-]*нибу[дт]ь","что-нибудь"],//TODO: просклонять
	["ч[ёое]гонить","чего-нибудь"],
	["какую нибудь","какую-нибудь"],//TODO: просклонять
	["ес[ст]+ес+н[ао]","естественно"],
	["катац+о","кататься"],
	["к[ао]роч[еь]*","короче"],
	["в-*[оа-]+[пб]*ще","вообще"],


//	["пожалста","пожалуйста"],//Объединено
	["скока","сколько"],
	["с[её]дня","сегодня"],
	["тада","тогда"],
	["смореть","смотреть"],
	["ваще","вообще"],
	["к[ао]не[шч]н[оа]","конечно"],
	["щ[ая][сз]*","сейчас"],
	["хош","хочешь"],
	["весч","вещь"],
	["чему-нить","чему-нибудь"],
	["каком-нить","каком-нибудь"],
	["канеш","конечно"],
	["бля","эх"],//Ибо сил моих больше нет
	["см[а]+ри","смотри"],
	["кр[еи]ве[тд]к[оа]","креветка"],
	["йа","я"],
	["в[\\s-]*о+[пб]щем","в общем"],



	["тол*ь*к[ао]-*что","только что"],
	["почти-*[чш]то","почти что"],
	["луч[ёе]м","лучом"],
	["н[еи]зна[еи]т","не знает"],
	["севодня","сегодня"],
	["м[оа]л[оа]д[её]ж[еи]","молодёжи"],
	["щ[еи]таю","считаю"],
	["кирпич[её]м","кирпичом"],
	["режит","режет"],
	["вроди","вроде"],
	["ч[иае][вг]о","чего"],
	["движ[её]к","движок"],
	["каждего","каждого"],
	["написанно","написано"],
	["позиционировнаие","позиционирование"],
	["почемы","почему"],
	["можна","можно"],
	["чесно","честно"],//TODO: честный и т. д., не обидеть чеснок
	["со+твет*ст*вен+о","соответственно"],
	["возмоно","возможно"],
	["от-*тудова","оттуда"],
	["времено","временно"],
	["инное","иное"],//TODO: просклонять, лучше - окончания в кучку
	["граници","границы"],
	["каждего","каждого"],
	["пр[ие]д[её]ть*ся","придётся"],
	["отве[дт]ь*те","ответьте"],
	["уборщиться","уборщица"],
	["прид[её]ться","придётся"],
	["мужич[ёе]к","мужичок"],
	["однажду","однажды"],
	["бе[сз]толоч","бестолочь"],
	["красивше","красивее"],
	["доевши","доев"],
	["помаги","помоги"],//Помагичить
	["хоч[еи]м","хотим"],//хохочем
	["хотишь","хочешь"],
	["хоч[еи]те","хотите"],
	["хотит","хочет"],
	["хочут","хотят"],
	["вылазит ","вылезает "],//TODO: аналоги
	["и(?:сч|щ|ш)о","ещё"],
	["лучче","лучше"],
	["жизне","жизни"],
	["седишь","сидишь"],
	["к[ао]во","кого"],
	["н[ие]з*ь*зя","нельзя"],
	//["миня","меня"],//Нельзя, речка такая есть! [Katzen Gott] речка с большой буквы должна быть. Так что, наверное, можно
	["апять","опять"],
	["зопиши","запиши"],
	["н[ие][ -]над[ао]","не надо"],
	["наверн[ао]е*","наверное"],
	["етими","этими"],//TODO: просклонять, не обидев йети!
	["када","когда"],
	["скуб","скуп"],
	["в-*зад[еи]","сзади"],
	["с-*зад[еи]","сзади"],
	["з-*зад[еи]","сзади"],

	["серебреного","серебряного"],//TODO: просклонять
	["сначало","сначала"],
	["еще","ещё"],
	["ее","её"],
	["пороль","пароль"],
	["жжот","жжёт"],
	["молодёж","молодёжь"],
	["полувер","пуловер"],
	["продовца","продавца"],
	["падажди","подожди"],
	["пожалу*ста","пожалуйста"],
//	["безплатно","бесплатно"],

	["староной","стороной"],
	["тожэ","тоже"],
	["такжэ","также"],
	["патаму","потому"],
	["жудко","жутко"],
	["поарать","поорать"],
	["сандали","сандалии"],
	["што","что"],
	["што-*то","что-то"],
	["скочать","скачать"],
//	["отзов(?=(?:ы||а|у|ом|ам|ами))","отзыв"],
	["троль","тролль"],
	["придти","прийти"],
	["ложить","класть"],
//	["я ложу","кладу"],//Подойти к ложу / подойти к кладу
	["ложим","кладём"],
	["ложишь","кладёшь"],
	["ложите","кладёте"],
	["лож[ау]т","кладут"],
	["лож[ие]т","кладёт"],
//	["светой","святой"],//TODO: склонять
	["вкантакте","вконтакте"],
	["ихн(?:ий|его|ему|им|ем|ее|яя|ей|юю|ие|их|ими)","их"],
	["сдесь","здесь"],
	["калеса","колеса"],
	["знач[её]к","значок"],
	["покласть","положить"],
	["никаго","никого"],
	["кагда","когда"],
	["п[ао]ч[ие]му","почему"],
	["экспрес*о","эспрессо"],
	["видете","видите"],
	["видешь","видишь"],
	["видет","видит"],
	["видют","видят"],
	["видем","видим"], //[Katzen Gott]: тут вроде все. Может быть можно как-то их "склеить"?
	["сп[оа]сиб[оа]","спасибо"],
	["типо","типа"],
	["граммот","грамот"],
	["ключ[её]м","ключом"],
	["нович[ёе]к","новичок"],
	["нада","надо"],
	["забеременяю","забеременею"],
	["болкон","балкон"],//TODO: просклонять, не обидев князя Болконского
	["очь*(?!-ч)","очень"],
	["н[ие]разу","ниразу"],
	["завтро","завтра"],
	["гаус","Гаусс"],//TODO: просклонять. В префиксы нельзя, ибо c -> сс
	["металы","металлы"],//TODO: просклонять, помнить про глагол "метал"
	["щелч[её]к","щелчок"],
	["параноя","паранойя"],//TODO: досклонять
	["паранои","паранойи"],
	["редов","рядов"],
	["истощенна","истощена"],
	["истощенно","истощено"],
	["истощенны","истощены"],
	["пребь[ёе]т","прибьёт"],//TODO: проспрягать
	["стери","сотри"],
	["подощло","подошло"],
	["молодожённых","молодожён"],//TODO: просклонять
	["амбула","фабула"], // [Katzen Gott]: "фабула" подойдет, но если у кого-то есть версия лучше — welcome.
];

var orphoPrefixToCorrect=[
/*
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
*/
	["манет","монет"],//Обманет
	["п[оа]д[оа]ван","падаван"],
	["сонц","солнц"],
	["выстовк","выставк"],
	["ковычь*к","кавычк"],
	["к[оа]выч[еи]к","кавычек"],
	["подчерп","почерп"],//[Katzen Gott]: подчерпнуть и иже с ним.
	["комманд","команд"],
	["тюрм","тюрьм"],
	["корысн","корыстн"],
	["д[еи][ао]лект","диалект"],
	["спорт*цмен","спортсмен"],
	["совпод","совпад"],
	["ограничев","ограничив"],
	["помошь*ник","помощник"],
	["предъ*истори","предыстори"],
	["прекрастн","прекрасн"],
	["обезпеч","обеспеч"],
	["об[ьъ][её]м","объём"],
	["х[ао]р[ао]ш","хорош"],
	["опода","опада"],
	["большенств","большинств"],
	["г[еи]м+[оа]ро","геморро"],
	["колличеств","количеств"],
	["медлен(?!н)","медленн"],
	["попробыва","попробова"],
	["помошь","помощь"],
	["чорт","чёрт"],
	["расчит","рассчит"],
	["отсутсв","отсутств"],
	["здрав*ст*вуй","здравствуй"],
	["неот[ъь]емлим","неотъемлем"],
	["к[оа]м+ентар","комментар"],
	["п[еи]р[еи][оа]дич","периодич"],
	["выйгр","выигр"],
	["продова","продава"],
	["встрепин","встрепен"],
	["многомернн","многомерн"],
	["неопастн","неопасн"],
	["безопастн","безопасн"],
	["опастн","опасн"],
	["куллер","кулер"],
	["повтар","повтор"],
	["пр[ие]вр[ао]щ","превращ"],
	["возражд","возрожд"],
	["замарач","заморач"],
//	["сь","съ"],//TODO: прочие приставки//Мэри Сью
	["учон","учён"],
	["удиля","уделя"],
	["избера","избира"],
	["координальн","кардинальн"]
/*
	[""+sya,""],
	[""+sya,""],
*/
	["предьяв","предъяв"],
	["держут"+sya,"держат"],
	["получет"+sya,"получит"],
	["неполуч[еи]т"+sya,"не получит"],
	["обидить"+sya,"обидеть"],
	["дерать"+sya,"дирать"],
	["тварит"+sya,"творит"],
	["перепех","перепих"],
	["уеден","уедин"],
	["извен","извин"],
	["обворач","оборач"],
	["бъ","бь"],
	["под(?=ск[ао]льз)","по"],
	["назвает","называет"],//5 шт.  на Баше
	["металич","металлич"],
	["пичаль","печаль"],
	["пакров","покров"],
	["отдера","отдира"],//TODO: другие приставки
	["по-файлов","пофайлов"],
	["спичич","спичеч"],
	["дуел","дуэл"],
	["невидем","невидим"],
	["счелч","щелч"],
	["сельне","сильне"],
	["б[ие]бл[ие]о","библио"],
	["бесвязн","бессвязн"],
	["трол(?!л)","тролл"],
	["ощущене","ощущени"],
	["мендал","миндал"],
	["седелок","сиделок"],
	["седелк","сиделк"],
	["женчин","женщин"],
	["из[- ]*под-","из-под "],
	["из[- ]*за-","из-за "],
	["друг-друг","друг друг"],
	["вапрос","вопрос"],
	["спраси","спроси"],
	["ч+[еа]ст*лив","счастлив"],//Числившихся
	["щ+[иеа]ст*лив","счастлив"],
	["с[щч]+[иеа]ст*лив","счастлив"],
	["щ+[иеа]ст","счаст"],
//	["с[чщ]+[иеа]ст","счаст"],//счесть
	["иксплоит","эксплоит"],
	["експлоит","эксплоит"],
	["п[ао]м[ао]г","помог"],
	["крадуц+а","крадутся"],
	["обисн","объясн"],
	["мароз","мороз"],
	["парнух","порнух"],
	["еп+он","япон"],
	["беомехан","биомехан"],
	["мабил","мобил"],
	["жистян","жестян"],
	["осиле(?!н)","осили"],
	["успак","успок"],
	["оронгутан","орангутан"],
	["ар[ао]нгутан","орангутан"],
	["матив","мотив"],
	["пильмен","пельмен"],
	["децтв","детств"],
	["ужос","ужас"],
	["кр[еи]ве[тд]к","креветк"], //[Katzen Gott]: "креведко" тоже встречается, или его не трогать?
	["тегров","тигров"],
	["испепил","испепел"],
	["сдрав*ств","здравств"],
	["здраств","здравств"],
	["собутылочник","собутыльник"],
	["обкута","окута"],
	["хлыш","хлыщ"],
	["ево[шн][а-яё]+","его"],
	["каров","коров"],
	["шпоргал","шпаргал"],
	["атракцион","аттракцион"],
	["режис[ёе]р","режиссёр"],
	["соеденин","соединен"],
	["симпотич","симпатич"],
	["девч[её]н","девчон"],
	["мущин","мужчин"],
	["большенств","большинств"],
	["седени","сидени"],
	["електр","электр"],
	["приемуществ","преимуществ"],
	["оффис","офис"],
	["агенств","агентств"],
	["одн[оа]класник","одноклассник"],
	["однаклассник","одноклассник"],
	["видио","видео"],
	["руск","русск"],
	["сматре","смотре"],
	["расчит","рассчит"],
	["кантакт","контакт"],
	["маструб","мастурб"],
	["серебрянн","серебрян"],
	["правельн","правильн"],
	["балон","баллон"],
	["коментар","комментар"],
	["прийд","прид"],
	["раз*сказ","рассказ"],
	["класн","классн"],
	["аргазм","оргазм"],
	["регестрац","регистрац"],
	["куринн","курин"],
	["востанов","восстанов"],
	["дешов","дешёв"],
	["пр[ие]з[ие]ватив","презерватив"],
	["телифон","телефон"],
	["гдето","где-то"],
	["часн","частн"],
	["расспис","распис"],
	["офицал","официал"],
	["здраств","здравств"],
	["тысеч","тысяч"],
	["жостк","жестк"],//Жостово
	["примьер","премьер"],
	["сь[её]м","съём"],
	["правел","правил"],
	["еслиб","если б"],
	["свинн","свин"],
	["разсве","рассве"],
	["росписани","расписани"],
	["гостинниц","гостиниц"],
	["комерч","коммерч"],
	["би[зс]плат","бесплат"],
	["бальш","больш"],
	["без(?=[кпстфхцчшщ])","бес"],//TODO: раз/роз
	["бес(?=[бвгджзлмр])","без"],
	["раз(?=[кпстфхцчшщ])","рас"],
	["рас(?=[бвгджзлмнр])","раз"],
	["воз(?=[пстфхцчшщ])","вос"],
	["вос(?=[бгджзлмнр])","воз"],
	["через(?=[кпстфхцчшщ])","черес"],
	["черес(?=[бвгджзлмр])","через"],
	["бези","безы"],
//	["безт","бест"],//TODO: доделать
	["не долюбли","недолюбли"],
	["боян","баян"],
	["будующ","будущ"],
	["лутш","лучш"],
	["курсав","курсов"],
	["венчестер","винчестер"],
	["брошур","брошюр"],
	["бе[сз]пелот","беспилот"],
	["вмистим","вместим"],
	["жолуд","жёлуд"],
	["возвро","возвра"],
	["в-*течени[ие]","в течение"],
	["вырощен","выращен"],
	["корект","коррект"],
	["грусн","грустн"],
	["граммот","грамот"],
	["неостановлюсь","не остановлюсь"],
	["пол-(?=[бвгджзкмнпрстфхцчшщ])","пол"],//TODO!
	["третье классник","третьеклассник"],//TODO!
	["организьм","организм"],
	["галав","голов"],
	["ро[сз]сол","рассол"],
	["мылостын","милостын"],
	["сотон","сатан"],
	["школьнец","школьниц"],
	["както","как-то"],
	["во[\\s-]*первых ","во-первых, "],
	["во-вторых ","во-вторых, "],
	["в-треть*их ","в-третьих, "],
	["копрал","капрал"],
	["ленност","леност"],
	["лесничн","лестничн"],
	["опазда","опозда"],
	["сохрон","сохран"],
	["умера","умира"],
	["убера","убира"],
	["собера","собира"],
	["разбера","разбира"],
	["погаловн","поголовн"],
	["пиня","пеня"],
	["иссиня ч[еоё]рн","иссиня-чёрн"],
	["Транс+[еи]льван","Трансильван"],
	["коффе","кофе"],
	["влаз[ие]л","влезал"],
	["свян+","свин"],
	["переборш","переборщ"],
	["бутербот","бутерброд"],
	["ч[ие]хотк","чахотк"],
	["привселюдн","прилюдн"],
	["вздыхн","вздохн"],
	["чательн","тщательн"],
	["малчуган","мальчуган"],
	["не-*многа","немного"],
	["р[ао][зс]д[оа][ёе]т","раздаёт"],
	["р[ие]п[ао]з[ие]т[ао]ри","репозитори"],
	["пр[ие]з[ие]нтац","презентац"],
	["шка[вф]ч[ие]к","шкафчик"],

];

var orphoPostfixToCorrect=[
/*	
	["",""],
	["",""],
	["",""],
	["",""],
*/
	["будте","будте"],
	["прячся","прячься"],
	["хранилищь","хранилищ"],
	["знакомся","знакомься"],
	["выгонет","выгонит"],
	["кажеться","кажется"],
	["ругалсо","ругался"],
	["глядет","глядит"],
	["давным\\s*давно","давным-давно"],
	["в-*курсе","в курсе"],
	["\\s*-*\\s+на-*все[вг][оа]","-навсего"],
	["\\s*-*\\s+н[ие]бу[дт]ь","-нибудь"],
	["бер[её]ться","берётся"],
	["кажуться","кажутся"],
	["носяться","носятся"],
	["несуться","несутся"],
	["прягатся","прягаться"],
	["глядется","глядеться"],
	["казываеться","казывается"],
	["удивлятся","удивляться"],
	["обращаеться","обращается"],
	["обращатся","обращаться"],
	["обновяться","обновятся"],
	["обновлятся","обновляться"],
	["пишуться","пишутся"],
	["постяться","постятся"],
	["ходяться","ходятся"],
	["бражатся","бражаться"],
	["цеплятся","цепляться"],
	["вращатся","вращаться"],
	["видиться","видеться"],
	["йдуться","йдутся"],
	["станеться","станется"],
	["стануться","станутся"],
	["боротся","бороться"],
	["смотриться","смотрится"],
	["стремяться","стремятся"],
	["дасться","дастся"],
	["глашатся","глашаться"],
	["ниметься","нимется"],
	["-нть","-нибудь"],
	["н[ие]буть","нибудь"],
	["надеятся","надеяться"],
	["гадатся","гадаться"],
	["печататся","печататься"],
	["б[еи]руть*ся","берутся"],
	["т[еи]ря[еи]шь*","теряешь"],
	["пиш[иы]шь*","пишешь"],
/*
	[""+ca,""],
	[""+ca,""],
	[""+ca,""],
	[""+ca,""],
	[""+ca,""],
	[""+ca,""],
*/

	["дра"+ca,"драться"],
	["знакоми"+ca,"знакомиться"],// что делать, если фраза будет "он с ней знакомица" (знакомится)?
	["мая"+ca,"маяться"],
	["сыпае"+ca,"сыпается"],
	["рву"+ca,"рвутся"],
	["крыва"+ca,"крываться"],
	["крывае"+ca,"крывается"],
	["крывае"+ca,"крывается"],
	["нрави"+ca,"нравится"],
	["зывае"+ca,"зывается"],
	["трахаю"+ca,"трахаются"],
	["готовяться","готовятся"],
	["боиться","боится"],
	["думатся","думаться"],
	["мчиться","мчится"],
	["обидется","обидеться"],
	["ждатся","ждаться"],
	["маятся","маяться"],
	["мытся","мыться"],
	["рватся","рваться"],
	["тиратся","тираться"],
	["кусатся","кусаться"],
	["диратся","дираться"],
	["ниматся","ниматься"],
	["ложаться","ложатся"],
	["нравяться","нравятся"],
	["смеятся","смеяться"],
	["сядеться","сядется"],
	["гулятся","гуляться"],
	["жаловатся","жаловаться"],
	["пытатся","пытаться"],
	["оватся","оваться"],
	["з[ао]бот[яю]ть*ся","заботятся"],
	["б[ие]ратся","бираться"],
	["плавяться","плавятся"],
	["деруться","дерутся"],
	["хвастатся","хвастаться"],
	["вертиться","вертится"],
	["одется","одеться"],
	["грется","греться"],
	["еватся","еваться"],
	["ыватся","ываться"],
	["зыватся","зываться"],
	["врубатся","врубаться"],
	["гружатся","гружаться"],
	["пользоватся","пользоваться"],
	["стебатся","стебаться"],
	["иватся","иваться"],
	["писатся","писаться"],
	["двигатся","двигаться"],
	["колотся","колоться"],
	["являтся","являться"],
	["режуться","режутся"],
	["встречатся","встречатся"],
	["братся","браться"],
	["начинатся","начинаться"],
	["трахатся","трахаться"],
	["занятся","заняться"],
	["кажеться","кажется"],
	["хочеться","хочется"],
	["ходиш","ходишь"],
	["просяться","просятся"],
	["к[оа]зать*ся","казаться"],
	[" ка","-ка"],
	["видил(?=а|и|о|)(?=с[яь])","видел"],
	["трахац+[оа]","трахаться"],
	["батареик","батареек"],
	["глядывац+[ао]","глядываться"],
	["играц+[оа]","играться"],
	["товарищь","товарищ"],
	["сушняч[её]к","сушнячок"],
	["пишеться","пишется"],
	["щ[еёо]лк[ао][еи]т","щёлкает"],
	["читаец+а","читается"],
	["будеш","будешь"],
	["пользуюца","пользуются"],
	["пытаюц+а","пытаются"],
	["ругаец+о","ругается"],
	["явяться","явятся"],
	["садют","садят"],
	["пускаюц+а","пускаются"],
	["хочеш","хочешь"],
	["следующию","следующую"],
	["борятся","борются"],
	["сыпится","сыпется"],
	["г[ао]в[ао]риш","говоришь"],
	["ються","ются"],
	["ёться","ётся"],
	["аеться","ается"],
	["оеться","оется"],
	["уеться","уется"],
	["яеться","яется"],
	["ееться","еется"],
	["юеться","юется"],
	["-ли"," ли"],
	["-же"," же"],
	["-бы"," бы"],
//	["-что"," что"],//кое-что
	["можеш","можешь"],
	["аеш","аешь"],
	["шся","шься"],
	["гл[аея]диш","глядишь"],
	["сыпатся","сыпаться"],
	["рвуться","рвутся"],
	["изьм","изм"],//TODO: просклонять
	["цыя","ция"],//TODO: просклонять
	["кочать","качать"],//TODO: проспрягать
	["рвуться","рвутся"],
	["пользуеться","пользуется"],
	["пожж[еа]","позже"],
	["кочает","качает"],
	["кочаеть*ся","качается"],
	["алася","алась"],
	["шол","шёл"],
	["смотр[ие]ш","смотришь"],
	["смотрем","смотрим"],//TODO: допроспрягать. И вообще все глаголы-исключения
	["терад","тирад"],
	["цыми","цами"],
];

var orphoFragmentsToCorrect=[
/*
	["",""],
	["",""],
	["",""],
*/
	["п[ао]р[ао]л+[еи]л+[ао]грам+","параллелограмм"],
	["матер[еи]ял","материал"],
	["с[ие]р[ьъ][её]з","серьёз"],
	["елемент","элемент"],
	["тренажор","тренажёр"],
	["обезъян","обезьян"],
	["р[еи]с+т[ао]ран","ресторан"],
	["ат+р[ие]бут","атрибут"],
	["искуств","искусств"],
	["естесств","естеств"],
	["ьезд","ъезд"],
	["ьезж","ъезж"],
	["ньюанс","нюанс"],
	["паралел","параллел"],
	["распрострон","распростран"],
	["съ*о+риентир","сориентир"],
	["пермонент","перманент"],
	["парашут","парашют"],
	["ьявл","ъявл"],
	["миллиц","милиц"],
	["пр[оа]т+[оа]тип","прототип"],
	["[оа]р[еи]нтир","орентир"],
	["расствор","раствор"],
	["балотир","баллотир"],
	["интерис","интерес"],
	["тринир","тренир"],
	["пологают","полагают"],
	["варачива","ворачива"],
//];[
	["топчит"+sya,"топчет"],//sya уже включает границу слова
	["пологаеть*"+sya,"полагает"],
//	["видит"+sya,"видеть"],//Бред
	["видет"+sya,"видит"],
	["клеет"+sya,"клеит"],
	["клеют"+sya,"клеят"],
	["пялет"+sya,"пялит"],
	["тащет"+sya,"тащит"],
	["бъёт"+sya,"бьёт"],
	["смотрет"+sya,"смотрит"],
	["тр[еия]с[ёе]т"+sya,"трясёт"],//TODO: проспрягать
	["хочит"+sya,"хочет"],
	["зачот","зачёт"],
	["щитин","щетин"],
	["учасн","участн"],
	["разет","розет"],
	["если-*чо","если что"],
	["чуств","чувств"],
	["сикунд","секунд"],
	["лучьш","лучш"],
	["ч[ие]л[оа]в*[еэ]к","человек"],
	["совецк","советск"],
	["инстал(?![лл])","инсталл"],
	["ньч","нч"],
	["ньщ","нщ"],
	["чьн","чн"],
	["щьн","щн"],
	["чьк","чк"],
	["ъи","ы"],
	["ъэ","э"],
	["тендор","тендер"],
	["будующ","будущ"],
	["следущ","следующ"],
	["празн","праздн"],
	["пр[ие]з[ие]дент","президент"],
	["цыкл","цикл"],
	["мед[еи]ц[иы]н","медицин"],
	["интерестн","интересн"],
	["класн","классн"],
	["эксплуот","эксплуоат"],
	["принцып","принцип"],
	["субьект","субъект"],
	["обьект","объект"],
	["мыслем","мыслим"],
	["престег","пристег"],
	["престёг","пристёг"],
	["фармат","формат"],
	["ьедин","ъедин"],
//	["ьед[еи]н","ъедин"],//Объедение
//	["ъед[еи]н","ъедин"],
	["проблемм","проблем"],
	["пропоган","пропаган"],
	["коблук","каблук"],
	["буит","будет"],
	["хотяб","хотя б"],
	["регестр","регистр"],//Или "реестр", но сочтём это санкциями
	["рецедив","рецидив"],
	["оч[еи]рова","очарова"],
	["ьясн","ъясн"],
	["чорн","чёрн"],
	["авторезир","авторизир"],
	["ил*[еи]м*[еи]нт","элемент"],
	["эл*[еи]м*[еи]нт","элемент"],//TODO: дебажить до "[эи]л*[еи]м*[еи]нт"
	["пробыва","пробова"],
	["бытерброд","бутерброд"],
	["cочельнтик","cочельник"],
	["глядав","глядыв"],
	["брительк","бретельк"],
	["р[еи]к[ао]ш[еи]т","рикошет"],
	["м[ие]н[ие]рал","минерал"],
	["проэкт","проект"],
	["водоконал","водоканал"],// не могу поставить отдельно ["конал", "канал"]. Есть названия фирмы "конал" и "Конал" - имя ирландского героя
];

var matyuki=[
];

var yo=[
];

try{
	module.exports.orphoWordsToCorrect     = orphoWordsToCorrect;
	module.exports.orphoPrefixToCorrect    = orphoPrefixToCorrect;
	module.exports.orphoPostfixToCorrect   = orphoPostfixToCorrect;
	module.exports.orphoFragmentsToCorrect = orphoFragmentsToCorrect;
}catch(e){
	//Значит, не node.js
}
