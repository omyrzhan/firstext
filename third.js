
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


function getChamp(champCup) {
  
    const champs = document.querySelectorAll( champSelector);
    let res = null;
    let nst = (champs.length);
    if (nst == 0) {return res;}
   
    
    
    

    champs.forEach(ch => {
        const cup = ch.querySelectorAll(champCupSelector);
      
        

        if (cup[0].textContent.trim() == champCup) {
            res = ch;
         
        };
    });

    return res;
}

function getSetkaCup() {

    return getChamp('Setka Cup');
    
}
function getEvents(champ) {
    return champ.querySelectorAll(eventSelector);
}

function getTeams(ev) {
    const teams = ev.querySelectorAll(teamSelector);
    const res = [];

    if (teams.length !== 2) {
        return ["", ""];
    }

    teams.forEach(t => {
        res.push(t.textContent.trim());
    });

    return res;
}

function getScore(eventEl) {
    const lines = eventEl.querySelectorAll(scoreLineSelector);
    

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
        const scoreAllEl = line.querySelectorAll(scoreCellAllSelector);
        if (scoreAllEl.length !== 1) {
            return [];
        }
        if (!isNaN(parseInt(scoreAllEl[0].textContent[0], 10))) {
            scoreAll[i] = parseInt(scoreAllEl[0].textContent, 10);
            
        }

        const scoreEls = line.querySelectorAll(scoreCellSelector);
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

class Ev
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
      setTeams(teams)
        {
        	  this.teams = teams;      
        }
      checkScore()
        {
        	let t = this.score[0][0]+this.score[0][1]+1;
        let ts = this.score[t];
        if ((ts[0] > 10) && ((ts[0] - ts[1]) > 1)) {
            this.score[0][0] += 1;
            
        }
        if ((ts[1] > 10) && ((ts[1] - ts[0]) > 1)) {
            this.score[0][1] += 1;
            
        }
        this.set = this.score[0][0]+this.score[0][1]+1; 
        
        
        }
      checkSetWin()
      {
      	this.setwin = [0, 0, 0, 0, 0];
      	for (let i = 1; i < this.set; i++) 
        {
            if (this.score[i][0] > this.score[i][1]) 
            {
                this.setwin[i - 1] = 1;
            }
            if (this.score[i][0] < this.score[i][1]) 
            {
                this.setwin[i - 1] = 2;
            }
        }
      }
      check()
      { 
         this.checkScore();
         this.checkSetWin();
      
      }
      
      
      }
class BetItem
{
	removebtn={};
	sportleague="";
	team1="";
	team2="";
	staketype="";
	stake = "";
	coef = 1.00;
	isinbet = false;
}
class WholeBets
{
	choicetypeofstake={};
	totalcoef=1.00;
	impfield={};
	plusbtn={};
	minusbtn={};
	potentialwin =1.00;
	confbtn={};
	


}
      
class Conf
{
	constructor()
	{
		this.betlist =[];
		this.whbt={};	
	}
	getBetList()
	{
		let btits=[];
		let whbt = new WholeBets();
		let rmbt, splg, teams, sttype, st, cf,d1,d2,d3,d4,d5,d6,d7;
		const cpn0=document.querySelector("div.cpn");
		const cpn1=document.querySelector("div.cpn-bets-list");
		if (cpn1)
		{
			
			
			let cpn2s = cpn1.querySelectorAll("div.cpn-bet.cpn-bets-list__item");
			for (let cpn2 of cpn2s)
			{
				let bt= new BetItem();
				rmbt = cpn2.querySelector("button.cpn-btn.cpn-bet__remove.cpn-btn--size-m.cpn-btn--close");
				if (rmbt)
				{
					bt.removebtn = rmbt;
					
				
				} 
				splg=cpn2.querySelector("span.cpn-bet-sport-name__text");
				if (splg)
				{
					bt.sportleague = splg.textContent.trim();
				
				}
			
				teams =cpn2.querySelectorAll("span.cpn-bet-team__name");
				if (teams.length == 2)
				{
					bt.team1= teams[0].textContent;
					bt.team2= teams[1].textContent;
					
				
				}
				sttype = cpn2.querySelector("div.cpn-bet-market__group");
				if (sttype)
				{
					bt.staketype =sttype.textContent;
				
				}
			
			
				
				
				st = cpn2.querySelector("span.cpn-bet-market__label");
				if (st)
				{
					bt.stake =st.textContent.trim();
				
				};
				
				cf = cpn2.querySelector("div.cpn-bet__coef");
				if (cf)
				{
					bt.coef =parseFloat(cf.textContent);
				
				}
				btits.push(bt);
				
				
				
			}
			
		
		d2 = cpn0.querySelector("div.cpn-total__coef");
		if (d2)
		
		{
			d7 = d2.querySelector("span.cpn-text__content");
			whbt.totalcoef = parseFloat(d7.textContent);
			
		
		
		}
		d3 = cpn0.querySelector("span.multiselect__single");
		if (d3)
		{
			whbt.staketype = d3.textContent;
			alert(whbt.staketype);	
		}
		d4 = cpn0.querySelector("input.cpn-value-controls__input");
		if (d4)
		{
			whbt.impfield = d4;	
		}
		d5 = cpn0.querySelector("i.cpn-btn__faicon.fa.fa-plus");
		if (d5)		
		{			
			whbt.plusbtn = d5.parentElement;			
		}
		d6 = cpn0.querySelector("i.cpn-btn__faicon.fa.fa-minus");
		if (d6)
		{
			whbt.minusbtn = d6.parentElement;			
		}
		
		}
		this.betlist = btits;
		this.whbt = whbt;
		
	
	
	}
	getPotentialWin()
	{
		
		const cpn0=document.querySelector("div.cpn");
		if (cpn0 == null)
		{
			alert("null");
			return null;
			
		
		}
		let pws = cpn0.querySelectorAll("span.cpn-text__content");
		
		
		let b = false;
		pws.forEach(item => {
		   if (b)
			{
				alert(item.textContent.trim());
				let str1s = item.textContent.match(/\w+/g);
				alert(str1s.length);
				alert(str1s[0]);
				alert(str1s[1]);
				alert(str1s[2]);
				let str1 = "1.00";
				if (str1s.length ==3)
				
				{str1 = str1s[0] +"."+ str1s[1];}
				if (str1s.length ==2)
				
				{str1 = str1s[0];}
				if (str1s.length ==4)
				
				{str1 = str1s[0] + str1s[1]+"."+str1s[2];}
				
				
				this.whbt.potentialwin = parseFloat(str1);
				
				b = false;
				
			
			}
			if (item.textContent.trim() =="Potential winnings")
			{ 
				b = true;
			
			}
			
			
			
			
			
			
			});
		

		
	
	
	
	
	
	
	}
	
	getconfbtn()
	{
		const cpn0=document.querySelector("div.cpn");
		if (cpn0 == null)
		{
			alert("null");
			return null;		
		}
		this.whbt.confbtn = cpn0.querySelector("button.cpn-btn.cpn-btns-group__btn.cpn-btn--theme-accent.cpn-btn--size-m.cpn-btn--default");
	}
	
	async confirmBet(evlist,betsum)
	{
		this.getBetList();
		for (let ev in evlist)
		{
			t1 =ev.teams[0];
			t2 =ev.teams[1];
			b = false;
			for (let btitem in this.betlist)
			{
				if ((btitem[team1] == t1) && (btitem[team2] == t2)) 
				{b = true;
				btitem[isinbet] = true;
				break;
				}
			}
			if (b == false) return -1;
			
			
		
		
		}
		for (let btitem in this.betlist)
		{
			if (btitem[isinbet] == false)
			{btitem.removebtn.click();
			await sleep(500);
			}
		}
		this.getconfbtn();
		if (this.whbt.confbtn) {this.whbt.confbtn.click();}
		return 0;
	
	
	
	
	}


}
class SetBet
{
	constructor()
	{
		this.evlist =[];
		
	}
	clickMore(ev) {
    const cls = ev.querySelectorAll(moreEvent);
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
   clickSetCoef(ev, setNumber, coefTitle) {
	alert("begin clicksetcoef");
    const sets = ["0 Set", "1 Set", "2 Set", "3 Set", "4 Set", "5 Set"];
    const setText = sets[setNumber];
    alert(setText);

    const selector0 = "div.c-events.c-events_inner";
    let moreWrappers = ev.querySelectorAll(selector0);

    const selector1 = "div.c-events__item.c-events__item_game";
    const selector2 = "span.c-events__teams";
    const selector3 = "span.c-bets__bet.c-bets__bet_coef.c-bets__bet_sm";
    let setWrappers = [];

    if (moreWrappers.length < 1) {
        setWrappers = ev.querySelectorAll(selector1);
    } else {
        setWrappers = moreWrappers[0].querySelectorAll(selector1);
    }
    alert(setWrappers.length);
    alert("step 6");
    

    for (let s of setWrappers) {
        const setName = s.querySelectorAll(selector2);
        alert(setName);

        if (setName.length > 0 && setName[0].textContent.trim() == setText) {
            const coefs = s.querySelectorAll(selector3);

            if (coefs.length > 0) {
                for (let c of coefs) {
                    const t = c.getAttribute("title");

                    if (t && t.trim() == coefTitle) {
                        const cs = c.querySelectorAll("span.c-bets__inner");

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
    clickMainCoef( ev, coefTitle) {
	alert("begin click main coef");
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
	setsinglebet(ev)
	{
		alert(JSON.stringify(ev));
		const sets = ["0 Set", "1 Set", "2 Set", "3 Set", "4 Set", "5 Set"];
		alert(ev.set);
      const setText = sets[ev.set];
      alert(setText);
      const champ = getSetkaCup();
      const evs = getEvents(champ);
      alert(evs.length);
      alert(typeof evs);
      let ev1 = null;
      for (let i = 0;i<evs.length; i++)


      {
      	
      	alert("in forEach");
      	
      	let teams1 = getTeams(evs[i]);
      	alert(teams1);
      	if ((teams1[0] ==ev.teams[0])&&(teams1[1] ==ev.teams[1]))
      	{
      		ev1 = evs[i];
      		
      	
      	}     	
      	}
      if (ev1 == null){ return ev;}
      alert("step 4");
      let r = this.clickMore(ev1);
      if (r != 1){return ev;}
      if (ev.set == 5)
      {
      	r = this.clickMainCoef(ev1,ev.choice);
      	if (r == 1)
      	{
      		ev.stake5set = true;
      		ev.betset = ev.set;
      		return ev;
      	}
      
      
      }
      r = this.clickSetCoef(ev1, ev.set, ev.choice) ;
      if (r == 1){ev.betset = ev.set;
      if (ev.set == 2){ev.stake2set = true;}
      if (ev.set == 3){ev.stake3set = true;}
      if (ev.set == 4){ev.stake4set = true;}
      
      
      return ev;}
      alert("not stake");
      return ev;
      
      
      
	
	
	}
	






}
class MakeDessicion {

constructor() {
      this.arr =[];  

    }

md(event1){
if (event1.set == 1 ) {return [0, 0, 0, 1];}

return [0, 0, 0, 1];
}
}



class Loop
{
	constructor(n) {
        
        
        this.ds = new SetBet();
        this.n = n;
        this.waited = {};
        this.totalteams = [];
        this.md = new MakeDessicion();
    }

    manageev(event1) {
    	alert("step 3");
   	
        let event2 = new Ev();
        event2.score =event1.score;
        event2.teams = event1.teams;
        event2.set = event1.set;
        event2.betset = event1.betset;
        event2.strategy = event1.strategy;
        event2.multiplier = event1.multiplier;
        event2.betsum = event1.betsum;
        event2.setwin = event1.setwin;
        event2.choice = event1.choice;
        
        
        
        event2.check();
        if ((event2.set > 5)||(event2.score[0][0] == 3) || (event2.score[0][1] == 3)) {
            this.waited[event2.teams[0]] = event2;
            
            return event2;
        }
        if (event2.set == event2.betset) {
        	
            this.waited[event2.teams[0]] = event2;
            
            return event2;
        };
        if (event2.strategy[2] >= event2.strategy[3] && event2.strategy[2] > 0) {
        	
            if (event2.set > 1) {
                try {
                    event2.choice = String(event2.setwin[event2.set - 2]);
                } catch (error) {
                    alert("event1.set error");
                }
                event2.choice = event2.choice == "1" ? "2" : "1";
                event2.betsum = event2.set * 50;
                
                event2 = this.ds.setsinglebet(event2);
                
                
            };
        }

        if (event2.strategy[2] < event2.strategy[3] && event2.strategy[3] > 0) {
        
        	
            if (event2.set > 1) {
                try {
                	
                    event2.choice = (event2.setwin[event2.set - 2].toString());
                    
                } catch (error) {
                    alert("event1.set =");
                }
                event2.betsum = event2.set * 50;
                
              
            
                let event3 = this.ds.setsinglebet(event2);
             
            };
        };

        let t = event2.teams;

        this.waited[t[0]] = event2;
       return event2;
    }
    
    loop() {
    	alert("step 2");
    
    
        

        let ch = getSetkaCup();
        if (ch == null) {
            
            return 6;
        }
        

        let evs = getEvents(ch);
       
        if (evs.length == 0) {
            return 5;
        }
       

        evs.forEach(ev =>{
        
    	
            let teams = getTeams(ev);
          
            this.totalteams.forEach(tteams =>{ if (tteams[0] == teams[0]) {
            	
              
                this.waited[teams[0]].score = getScore(ev);
                
               
                this.manageev(this.waited[teams[0]]);
                
              
            };});
           
            
           
           
            });

        return 1;
    }

    async doloops() {
    	alert("do loop");
    	
    	
        for (let i = 0; i < this.n; i++) {
        
            if (i % 4 == 0) {
                this.loopfornew();
            }

            let r = this.loop();
             
            if (r == 0) {
                alert("r=0");
            };
           
           await sleep(5000);
           
           
        };
      
    }

    loopfornew() {
    	alert("step 1");
    
    	
        let currentteams = [];
        let newwaited = new Object();
       
        let ch = getSetkaCup();
        let evs = getEvents(ch);
        if (evs.length == 0) {
        	alert("not enough ev");
            return 5;
        };
        


        for (let ev of evs) {
        
            let teams = getTeams(ev);
           
            
            if (currentteams.includes(teams)) {
                let score1 = getScore(ev);
                if ((score1[1][0] + score1[1][1]) == 0) {
                	alert("continue");
                    continue;
                };
            };
         
            currentteams.push(teams);
           
            if (!this.totalteams.includes(teams)) {
            
                let event1 = new Ev();
                event1.teams = getTeams(ev);
                event1.score = getScore(ev);
                event1.strategy = this.md.md(event1);
               
              
                newwaited[event1.teams[0]] = event1;
                
    
            } else {
            	
                newwaited[event1.teams[0]] = this.waited[event1.teams[0]];
              
            };
        }
      


        this.totalteams = currentteams;

        this.waited = newwaited;
       
        return 1;
    }
   




}
  	
  
  
  
  
  
 
  


currenturl = window.location.href;
alert(currenturl);



l1 = new Loop(10);
alert("ppp");
//l1.doloops();

  