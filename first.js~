const champSelector = "div.dashboard-champ-content";
const champCupSelector = "div.c-events__name";
const eventSelector = "div.c-events__item.c-events__item_col.dashboard-champ-content__event-item";
const teamSelector = "div.c-events__team";
const scoreLineSelector = "div.c-events-scoreboard__line";
const scoreCellAllSelector = "span.c-events-scoreboard__cell.c-events-scoreboard__cell--all";
const scoreCellSelector = "span.c-events-scoreboard__cell";
const coefWrapSelector = "div.c-bets";
const coefSelector = "span.c-bets__bet.c-bets__bet_coef.c-bets__bet_sm";
const moreEvent = "span.c-events__more.c-events__more_events";
const setkaCup = "Setka Cup";




function sleep(ms){return new Promise(resolve => setTimeout(resolve, ms));}

function getElements(webDriver, selector) {
 
        return webDriver.querySelectorAll(selector);
 
}
function getTeams(ev) {
    const teams = getElements(ev, teamSelector);
    const res = [];

    if (teams.length != 2) {
        return ["", ""];
    }

    teams.forEach(t => {
        res.push(t.textContent.trim());
    });

    return res;
}
function clickMore(ev) {
	
    const cls = getElements(ev, moreEvent);
    if (cls.length < 1) {
        return 5;
    }
    const cl = cls[0];
    const clClass = cl.getAttribute("class");
    if (clClass.includes("activ")) {
        return 1;
    }
    try {
        cl.scrollIntoView();
                cl.click();
        return 1;
    } catch (error) {
        return 2;
    }
}
function getScore(eventEl) {
    const lines = getElements(eventEl, scoreLineSelector);
    

    if (lines.length !== 2) {
        return [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
    }

    const scoreAll = [0, 0];
    const scoreSet1 = [0, 0];
    const scoreSet2 = [0, 0];
    const scoreSet3 = [0, 0];
    const scoreSet4 = [0, 0];
    const scoreSet5 = [0, 0];

    for (let i = 0; i < 2; i++) {
        const line = lines[i];
        const scoreAllEl = getElements(line, scoreCellAllSelector);
        if (scoreAllEl.length !== 1) {
            return [];
        }
        if (!isNaN(parseInt(scoreAllEl[0].textContent[0], 10))) {
            scoreAll[i] = parseInt(scoreAllEl[0].textContent, 10);
            
        }

        const scoreEls = getElements(line, scoreCellSelector);
        scoreEls.forEach(scel => {
            const t = scel.getAttribute("title");
         

            switch (t) {
                case "1st set":
                    scoreSet1[i] = parseInt(scel.textContent, 10);
                  
                    break;
                case "1 Set":
                    scoreSet1[i] = parseInt(scel.textContent, 10);
                    break;
                case "2 Set":
                    scoreSet2[i] = parseInt(scel.textContent, 10);
                    break;
                case "3 Set":
                    scoreSet3[i] = parseInt(scel.textContent, 10);
                    break;
                case "4 Set":
                    scoreSet4[i] = parseInt(scel.textContent, 10);
                    break;
                case "5 Set":
                    scoreSet5[i] = parseInt(scel.textContent, 10);
                    break;
            }
        });
    }

    return [scoreAll, scoreSet1, scoreSet2, scoreSet3, scoreSet4, scoreSet5];
}
class Event 
    {
    	constructor() 
    	  {
	        this.score = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
	        this.multiplier = 1;
	        this.strategy = [0, 0, 0, 0];
	        this.teams = ["", ""];
	        this.set = 1;
	        this.betset = 0;
	        this.setwin = [0, 0, 0, 0, 0];
	        this.choice = "1";
	        this.betsum = 0;
	        this.stake2set=false;
	        this.stake3set=false;
	        this.stake4set=false;
	        this.stake5set=false;
	        
	        
        }
    }
function checkScore(score1)

   {
   	let score =score1;
       

        let t = score[0][0]+score[0][1]+1;
        let ts = score[t];
        if (t<6) {
        if ((ts[0] > 10) && ((ts[0] - ts[1]) > 1)) {
            score[0][0] += 1;
            
        }
        if ((ts[1] > 10) && ((ts[1] - ts[0]) > 1)) {
            score[0][1] += 1;
            
        }
       return score;
       }
   	return score1;
   	
   	
   }
function closebet()
  
{
	clbts=document.querySelectorAll("i,cpn-btn__close");
	
	clbts.forEach((element)=>
	           {
	           	pel=element.parentElement;
	           	if (pel != null)
	           	{
	           	pelclass = pel.getAttribute("class");
	           	
	           	if (pelclass != null)
	           	{
	           		
	           		if (pelclass.includes("cpn-bet__remove"))
	           		
	           		element.click();
	           		};
	           	
	           	}
		
		
	           	}
	           	

	
        	
        	
        
        
        
        });
     }
function getbetitems()
{
	items=document.querySelectorAll("div.cpn-bet.cpn-bets-list__item");
	alert(items.length);
	return items;



}
function getbetplayers(item)
{
	names= item.querySelectorAll("span.cpn-bet-team__name");
	alert(names.length);
	if (names.length ==2)
	{
		alert(names[0]);
	}
	return names;
}
function getSetWin(score1)

   {
   	let score =score1;
   	let setwin =[0,0,0,0,0]
   	ts = score[0][0]+score[0][1]|+1;
       

      for (let i = 1; i < ts; i++) 
        {
            if (score[i][0] > score[i][1]) 
            {
                setwin[i - 1] = 1;
            }
            if (score[i][0] < score[i][1]) 
            {
                setwin[i - 1] = 2;
            }
        }
   	
   	return setwin;
   	
   }
function getlastwinset(setwin)
{
	
	for (let i=1;i<5;i++)
	{
		if (setwin[i] ==0)
		{
			return setwin[i-1];
		}	
	}
	return 0;


}
function isAlt(setwin)
{
	if (setwin[1] ==0){return true;}
	if ((setwin[1] >0)&&(setwin[1] == setwin[0]))
	{
		return false;
	}
	if ((setwin[2] >0)&&(setwin[2] == setwin[1]))
	{
		return false;
	}
	if ((setwin[3] >0)&&(setwin[3] == setwin[2]))
	{
		return false;
	}
	if ((setwin[4] >0)&&(setwin[4] == setwin[3]))
	{
		return false;
	}
	return true;
}
function clickSetCoef(ev, setNumber, coefTitle) {
	
    const sets = ["0 Set", "1 Set", "2 Set", "3 Set", "4 Set", "5 Set"];
    const setText = sets[setNumber];

    const selector0 = "div.c-events.c-events_inner";
    let moreWrappers = getElements(ev, selector0);

    const selector1 = "div.c-events__item.c-events__item_game";
    const selector2 = "span.c-events__teams";
    const selector3 = "span.c-bets__bet.c-bets__bet_coef.c-bets__bet_sm";
    let setWrappers = [];

    if (moreWrappers.length < 1) {
        setWrappers = getElements(ev, selector1);
    } else {
        setWrappers = getElements(moreWrappers[0], selector1);
    }

    for (let s of setWrappers) {
        const setName = getElements(s, selector2);

        if (setName.length > 0 && setName[0].textContent.trim() == setText.trim()) {
            const coefs = getElements(s, selector3);

            if (coefs.length > 0) {
                for (let c of coefs) {
                    const t = c.getAttribute("title");

                    if (t && t.trim() == coefTitle) {
                        const cs = getElements(c, "span.c-bets__inner");

                        if (cs.length > 0) {
                            const c1 = cs[0];
                            try {
                                c1.scrollIntoView();
                                c1.click();
                                return 1;
                            } catch (error) {
                                return 3;
                            }
                        }
                    }
                }
            }
        }
    }
    return 0;
}

function clickMainCoef( ev, coefTitle) {
	
    const selector = "span.c-bets__bet.c-bets__bet_coef.c-bets__bet_sm";
    const mainCoefs = getElements(ev, selector);

    if (mainCoefs.length > 0) {
        for (let m of mainCoefs) {
            const t = m.getAttribute("title").trim();

            if (t == coefTitle) {
                m.scrollIntoView();
                m.click();

                return 1;
            }
        }
    }
    return 0;
}
async function confirmbet(event1) {
	     alert("begin confirm");
	     alert(JSON.stringify(event1));
	
        
        const selector = "div.cpn";
        const cpns = await getElements(document, selector);
        

        if (cpns.length > 0) {
            const cpn = cpns[0];
            const t = cpn.textContent;
           
            if (t.includes(event1.teams[0])) {
            	alert("teams included");
                const inputSelector = "input.cpn-value-controls__input";
                const inpt = await cpn.querySelector( inputSelector);
               
              
                if (inpt) 
                {
                	let eventkey = new KeyboardEvent("keypress", {
						  bubbles: true,
						  cancelable: true,
						  charCode: 0035,
						  keyCode: 35,
						  key: "5",
						  shiftKey: false,
						  altKey: false,
						  ctrlKey: false,
						  metaKey: false,
						  repeat: false,
						  location: KeyboardEvent.DOM_KEY_LOCATION_STANDARD,
						});
                	
                    inpt.click();
                    await sleep(500);
                    inpt.outerHTML ='<input type="text" class="cpn-value-controls__input" value ="50">';
                    //inpt.dispatchEvent(eventkey);
                    //inpt.setAttribute('value', 50);//event1.betsum.toString());
                    alert(inpt.outerHTML);
                    await sleep(5000);

                    const btnSelector = "span.cpn-btn__content";
                    const btns = await getElements(cpn, btnSelector);
                    for (let btn of btns) {
                        if (btn.textContent.trim() == "Place a bet") {
                            await btn.click();
                            await sleep(5000);

                            const modals = await document.findElementsById("modals-container");
                            for (let modal of modals) {
                                if (modal.textContent.includes("Bet accepted!")) {
                                    const btnsOk = await getElements(modal, "span.c-btn__text");
                                    for (let b of btnsOk) {
                                        if (b.textContent.includes("Ok")) {
                                            await b.click();
                                            event1.betset = event1.set;
                                            
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return event1;
    }

var starr =[];
async function loop(n) 
   {
   	let strategy4team0=starr;
   	let strategy4team1=starr;
   	let strategy4team2=starr;
   	
   	
   	let totalteam1=[];
   	let playedteam1=[];
   	let waited=new Object;
   	let b =1;
   	let currenturl = window.location.href;
      alert(currenturl);
      if (currenturl != "https://1xbet.kz/en/live/table-tennis/1733171-setka-cup")
        
        {
        	
        	
        	
        	window.location.replace("https://1xbet.kz/en/live/table-tennis/1733171-setka-cup");
        	await sleep(500);
        	
        };

   	
;
   	for (let i=0;i<n;i++) 
   	{
   		alert(i);
   	
   		
   		if (((i%4)==0) ||(b==0))
   		{
   			
   			let currentteam1=[];
   			let newwaited = new Object;
   			
   			chs = document.querySelectorAll(champSelector);
   			
   			if (chs.length>1) 
   			{
   				window.location.reload();
   			}
   			if (chs.length != 1) 
   			{
   				await sleep(600000);
   				b=0;  
   							
   				continue;
   			}
   			b=1;
   			
   			ch = chs[0];
   			evs = ch.querySelectorAll(eventSelector );
   			if (evs.length < 1) 
   			{
   				await sleep(600000);
   				b=0;  
   								
   				continue;
   			}
   			b =1 ;
   			
   			
   			for (let j =0;j <evs.length; j++) 
   			{
   				let ev = evs[j];
   				let teams = getTeams(ev);
   				
   				if (currentteam1.includes(teams[0]))
   				{
   					
   					let score1 = getScore(ev);
                  if ((score1[0][0] + score1[0][1]) == 0) 
                  {                 
                  	continue;                  	
                  }; 
   				}
   				
   				
   				currentteam1.push(teams[0]);
   				strategy4team2.push(teams[0]);
   				
               if (!totalteam1.includes(teams[0]) )
               {
               	
               	let event1 = new Event();
               	event1.teams = getTeams(ev);
                  event1.score = getScore(ev);
                  event1.score = checkScore(event1.score);
                  event1.set = event1.score[0][0]+event1.score[0][1]+1;
                  event1.setwin = getSetWin(event1.score);
                  if ((strategy4team2.includes(teams[0]))&&(isAlt(event1.setwin)))
                  {
                  	event1.strategy = [0,0,0,1];
              
                     
                  
                  
                  };
                  newwaited[teams[0]] = event1;
                  
                  
                  
                  
                
    
               } 
               else 
               {
               	
               	newwaited[teams[0]] = waited[teams[0]];
               
               };
               
            
        
         
              	
   		   }
   		 totalteam1 = [];
          waited = new Object;
   		 for (let t of currentteam1) 
               {
               	totalteam1.push(t);
               	waited[t] = newwaited[t];
               	
               	
               	
               } 
        
                    	
  
   	   }  
   	   
   	
   	chs1 = document.querySelectorAll(champSelector);
   			
   			if (chs1.length != 1) 
   			{
   				window.location.reload();
   			}
   			if (chs1.length != 1) 
   			{
   				console.log("begin sleep 10 min");
   				await sleep(600000);
   				b=0;  
   				console.log("end sleep 10 min");				
   				continue;
   			}
   			b=1;
   			
   			ch = chs1[0];
   			
   			let evs1 = ch.querySelectorAll(eventSelector);
   			
   			if (evs1.length < 1) 
   			{
   				console.log("begin sleep 10 min");
   				await sleep(600000);
   				b=0;  
   				console.log("end sleep 10 min");				
   				continue;
   			}
   			b =1 ;
   			
   			
   			for (let j =0;j <evs1.length; j++) 
   			{
   				let ev1 = evs1[j];
   				let teams = getTeams(ev1);
   				let score2 = getScore(ev1);
   				score2 = checkScore(score2);
   				let setwin = getSetWin(score2);
   				if ((setwin[4]>0) && isAlt(setwin))
   				{
   					strategy4team0.push(teams[0]);
   					strategy4team0.push(teams[1]);
   					strategy4team1.push(teams[0]);
   					strategy4team1.push(teams[1]);
   					strategy4team2.push(teams[0]);
   					strategy4team2.push(teams[1]);
   					
   					continue;
   				}
   				if ((score2[0][0] == 3)||(score2[0][1] ==3))
   				{
   					continue;
   				
   				
   				}
   				eventtemp = waited[teams[0]];
   				
   				if (eventtemp === undefined){continue;}
   				eventtemp.score=score2;
   				eventtemp.set = score2[0][0]+score2[0][1]+1;
   				eventtemp.setwin = setwin;
   				
   				if (!isAlt(eventtemp.setwin))
   				{
   					continue;
   				}
   				if (eventtemp.betset == eventtemp.set)
   				{continue;}
   				if (eventtemp.set <2)
   				{continue;} 
   				let   coefTitle ="2";				
   				if (setwin[eventtemp.set-2]==1)
   				{coefTitle ="1";}
   				if (setwin[eventtemp.set-2]==2)
   				{coefTitle ="2";}
   				if (setwin[eventtemp.set-2]==0)
   				{continue;}
   				
   				eventtemp.betsum =eventtemp.multiplier*eventtemp.set*50;
   				eventtemp.choice = coefTitle;
   			
   				if (eventtemp.set == 5)
   				{
   					let r2 =clickMainCoef(ev,coefTitle);
   					await sleep(500);
   					if (r2 == 1)
   					   {
   					   
   					   waited[teams[0]]=confirmbet(eventtemp);
   					   
   					   }
   				}
   				if (eventtemp.set < 5)
   				{
   					
   					let r1 =clickMore(ev1);
   					await sleep(500);
   					if (r1 == 1)
   					{
   						
   					   let r2 = clickSetCoef(ev1,eventtemp.set,coefTitle);
   					   await sleep(500);
   					   if (r2 == 1)
   					   {
   					   waited[teams[0]]=confirmbet(eventtemp);
   					   
   					   }
   					}
   				}
   				
   				
   				
   				
   				
   				
   				
   				
   				
   				
   			}  
   		await sleep(7000); 	   
      }
   }

//loop(8);
//closebet();
let items=getbetitems();
alert(items.length);
for (let i =0;i<items.length;i++)
{
	item= items[i];
	arr1 = getbetplayers(item);

}

