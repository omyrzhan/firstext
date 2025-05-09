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
	alert("begin clickmore");
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
        if ((ts[0] > 10) && ((ts[0] - ts[1]) > 1)) {
            score[0][0] += 1;
            
        }
        if ((ts[1] > 10) && ((ts[1] - ts[0]) > 1)) {
            score[0][1] += 1;
            
        }
       return score;
   	
   	
   	
   }
function getSetWin(score1)

   {
   	let score =score1;
   	let setwin =[0,0,0,0,0]
       

      for (let i = 1; i < 6; i++) 
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
function isAlt(setwin)
{
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
	alert("begin clickmaincoef");
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
        	
        	alert("step 6");
        	
        	window.location.replace("https://1xbet.kz/en/live/table-tennis/1733171-setka-cup");
        	await sleep(500);
        	alert("step 8");
        };
    }
loop(10);