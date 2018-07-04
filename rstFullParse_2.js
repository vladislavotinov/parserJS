// выборочный парсинг по rst

//var needle = require('needle');



const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const fakeUa = require('fake-useragent');


const url = "http://rst.ua/oldcars/?task=newresults&make%5B%5D=0&year%5B%5D=0&year%5B%5D=0&price%5B%5D=0&price%5B%5D=0&engine%5B%5D=0&engine%5B%5D=0&gear=0&fuel=0&drive=0&condition=0&from=sform&region%5B%5D=5&region%5B%5D=8";

let arrUrlPaginator = [];
//var temp = 0;

function startCreateFirstUrl (startFromId,countPagesEndId) // количество ссылок
{
	for(var i = startFromId; i< countPagesEndId-1; i++) // СОЗДАЕМ ССЫЛКИ 
	{
		//temp = i + 1;
		arrUrlPaginator[i] = url+"&start="+(i + 1);
	}


	return 0;
}

	
	
// Сделали ссылки на пагинаторы



function startRecordUrlOnAdvert (timeInterval, version) // время для интервала
{


i = 0;

timeInterval *= 1000; // ms => sec

	var q =	setInterval(function() 
	{	
		if(i >= arrUrlPaginator.length)
		{
			clearInterval(q); // стопаем интервал считывания заглавных ссылок
		}

		var headers = { // пытаемся подменить заголовки
 		 'User-Agent': fakeUa()
		};

		request( { url: url, headers: headers }  , function (error, response, body) {
  	    if (!error) 
  	  	{
        	var $ = cheerio.load(body);
        	var tagUrl = $(".rst-ocb-i-a");
            	tagUrl.each(function(i,vale) // берём заглавные ссылки на страници авто
				{	
					fs.appendFile( "UrlAdvBase"+version+".txt" , "\n"+ "rst.ua" + $(vale).attr("href"));
				});

    	} 
    	else 
    	{
        	console.log("Произошла ошибка: " + error);
    	}

	});




		i++; // итерация +1
		console.log("Итерация парсинга страниц пагинаторов: "+i);		
	},timeInterval); 


	return 0;
}

// Взяли заглавные ссылки со страниц на объявления




function regNumber(str){
var pattern = /  ?((\+?3)?8)?0\d{9}?/g; // ukr number , как бы он не был написан
return str.match(pattern);
}


// ПреКОМПИЛЯЦИЯ
startCreateFirstUrl(30,121); // ot i do

setTimeout(function() {
	startRecordUrlOnAdvert(22 , 2); // 22 sec interval vnutri stranicu
},Math.floor(Math.random() * (7000 - 2000 + 1)) + 2000 ); // 4 sec






// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Только ПАРСИНГ ССЫЛОК НА ОБЪЯВЫ ВЫШЕ. 
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^






// Начинаем парсить номера с объявлений

/*
setTimeout(function() { // Таймер для запуска после того, как спарсятся все заглавные ссылки
i = 0;
var interval = setInterval(function() {

if(i >= arrUrlPage.length-1) // Стоп для интервала
{
	clearInterval(interval);	
}

setTimeout(function() { // задержка для создания иллюзии при шуршании по объявлению

needle.get(arrUrlPage[i],function(err,res){
				console.log("Итерация парсинга номера: "+i);
				if(err) throw(err);
				// _______________ Действие с ТЕГАМИ НА СТРАНИЦЕ
				var $ = cheerio.load(res.body);
				var tagNumber = $(".rst-page-oldcars-item-option-block-container");
				var tagOldNumber= $(".rst-page-oldcars-item-option-block-container ul li");
				var tagNumberVersionOne = $(".rst-page-oldcars-item-option-block-container table td");
				var tagNumberVersionTwo = $(".rst-page-oldcars-item-option-block-container span");
				
				// Take Number per version's

				tagNumber.each(function(k,vale)
				{ // берём номера
					setTimeout(function()
					{
							if(regNumber($(vale).text()) != null)
						 	{
						 		temp = "\n"+regNumber($(vale).text());
						 		fs.appendFile("FullBase.txt", temp);
						 	}
					},504);
				});

				tagOldNumber.each(function(k,vale){
					setTimeout(function()
					{
							if(regNumber($(vale).text()) != null)
						 	{
						 		temp = "\n"+regNumber($(vale).text());
						 		fs.appendFile("FullBase.txt", temp);
						 	}
					},504);
				});

				tagNumberVersionOne.each(function(k,vale)
				{ 
					setTimeout(function()
					{
							if(regNumber($(vale).text()) != null)
						 	{
						 		temp = "\n"+regNumber($(vale).text());
						 		fs.appendFile("FullBase.txt", temp);
						 	}
					},504);
				});

				tagNumberVersionTwo.each(function(k,vale)
				{ 
					setTimeout(function()
					{
							if(regNumber($(vale).text()) != null)
						 	{
						 		temp = "\n"+regNumber($(vale).text());
						 		fs.appendFile("FullBase.txt", temp);
						 	}
					},504);
				});
 			}); 

i++;
}, Math.floor(Math.random() * (7000 - 3000 + 1) ) + 3000); // от 3 до 7 секунд шуршим на странице
}, 33300); // ~ 33 sek
}, timeTwo);
*/