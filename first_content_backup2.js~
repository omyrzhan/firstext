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



function getElements(webDriver, selector) {
 
        return webDriver.querySelectorAll(selector);
 
}
function getChamps(driver) {
    const champs = getElements(driver, champSelector);
    const res = [];

    champs.forEach(ch => {
        const cup = getElements(ch, champCupSelector);
        if (cup.length != 1) return;
        res.push(cup[0].textContent.trim());
    });

    return res;
}
function getChamp(driver, champCup) {
  
    const champs = getElements(driver, champSelector);
    
    nst = (champs.length);
    if (nst>1) {driver.location.reload();};
    
    let res = null;
    

    champs.forEach(ch => {
        const cup = getElements(ch, champCupSelector);
        

        if (cup[0].textContent.trim() == champCup) {
            res = ch;
         
        };
    });

    return res;
}

function getSetkaCup(driver) {
    return getChamp(driver, 'Setka Cup');
}


function getEvents(champ) {
    return getElements(champ, eventSelector);
}

function getTeams(ev) {
    const teams = getElements(ev, teamSelector);
    const res = [];

    if (teams.length !== 2) {
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
function getSetCoefs(ev) {
    const selector0 = "div.c-events.c-events_inner";
    const moreWrappers = getElements(ev, selector0);
    const res = {};
    if (moreWrappers.length < 1) {
        return res;
    }

    const moreWrapper = moreWrappers[0];
    const selector1 = "div.c-events__item.c-events__item_game";
    const selector2 = "span.c-events__teams";
    const selector3 = "span.c-bets__bet.c-bets__bet_coef.c-bets__bet_sm";
    const setWrappers = getElements(moreWrapper, selector1);

    setWrappers.forEach(s => {
        const setName = getElements(s, selector2);
        if (setName.length > 0) {
            const coefs = getElements(s, selector3);
            if (coefs.length > 0) {
                coefs.forEach(c => {
                    const t = c.getAttribute("title");
                    let t1 = 1.0;
                    const cs = getElements(c, "span.c-bets__inner");
                    if (cs.length > 0) {
                        const c1 = cs[0];
                        if (!isNaN(parseInt(c1.textContent[0], 10))) {
                            t1 = parseFloat(c1.textContent);
                        }
                    }
                    res[t] = t1;
                });
            }
        }
    });

    return res;    
}
class Event {
    constructor() {
        this.score = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
        this.multiplier = 1;
        this.strategy = [0, 0, 0, 0];
        this.teams = ["", ""];
        this.set = 1;
        this.betset = 0;
        this.setwin = [0, 0, 0, 0, 0];
        this.choice = "1";
        this.betsum = 0;
    }

    checkscore() {
        this.set = this.score[0][0] + this.score[0][1] + 1;
        if (this.set > 5) {
            return 0;
        }
        let ts = this.score[this.set];
        if ((ts[0] > 10) && ((ts[0] - ts[1]) > 1)) {
            this.score[0][0] += 1;
            this.set += 1;
        }
        if ((ts[1] > 10) && ((ts[1] - ts[0]) > 1)) {
            this.score[0][1] += 1;
            this.set += 1;
        }
        if (this.set > 5) {
            return 0;
        }
        if ((this.score[0][0] === 3) || (this.score[0][1] === 3)) {
            return 0;
        }
        for (let i = 1; i < this.set; i++) {
            if (this.score[i][0] > this.score[i][1]) {
                this.setwin[i - 1] = 1;
            }
            if (this.score[i][0] < this.score[i][1]) {
                this.setwin[i - 1] = 2;
            }
        }
        if (this.set > 1) {
            if (this.strategy[3] > 0) {
                for (let i = 1; i < this.set - 1; i++) {
                    if (this.setwin[i] == this.setwin[i - 1]) {
                        this.strategy[3] = 0;
                        break;
                    }
                }
            }
            if (this.strategy[2] > 0) {
                for (let i = 1; i < this.set - 1; i++) {
                    if (this.setwin[i] != this.setwin[i - 1]) {
                        this.strategy[2] = 0;
                        break;
                    }
                }
            }
        }
        return 1;
    }
}
class DoStake {
    constructor(driver) {
        this.driver = driver;
    }

    async confirm() {
        
        const selector = "div.cpn";
        const cpns = await getElements(this.driver, selector);

        if (cpns.length > 0) {
            const cpn = cpns[0];
            const t = await cpn.getText();
            if (t.includes(this.event1.teams[0])) {
                const inputSelector = "input.cpn-value-controls__input";
                const inpt = await getElements(cpn, inputSelector);
                if (inpt.length > 0) {
                    await inpt[0].clear();
                    await inpt[0].sendKeys(this.event1.betsum.toString());
                    await setTimeout(() => {
  console.log("Delayed for 1 second.");},5000);

                    const btnSelector = "span.cpn-btn__content";
                    const btns = await getElements(cpn, btnSelector);
                    for (let btn of btns) {
                        if (btn.getText().trim() === "Place a bet") {
                            await btn.click();
                            await setTimeout(() => {
  console.log("Delayed for 1 second.");},5000);

                            const modals = await this.driver.findElements(By.id("modals-container"));
                            for (let modal of modals) {
                                if (modal.getText().includes("Bet accepted!")) {
                                    const btnsOk = await getElements(modal, "span.c-btn__text");
                                    for (let b of btnsOk) {
                                        if (b.getText().includes("Ok")) {
                                            await b.click();
                                            this.event1.betset = this.event1.set;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    async doStake(event1) {
        this.event1 = { ...event1 };

        const closeSelector = "i.cpn-btn__close";
        const cpnClose = await getElements(this.driver, closeSelector);
        for (let cl of cpnClose) {
            await cl.click();
        }

        const chs = await getElements(this.driver, champselector);
        let ch = null;

        for (let ch1 of chs) {
            const cup = await getElements(ch1, champcupselector);
            if (cup.length < 1) continue;

            if (cup[0].getText() === setkacup) {
                ch = ch1;
            }
        }

        if (!ch && chs.length === 1) {
            ch = chs[0];
        } else if (!ch) {
            return event1;
        }

        let evs = await getEvents(ch);
        if (evs.length === 0) return event1;

        for (let ev of evs) {
            const teams = await getTeams(ev);
            if (teams.join() === this.event1.teams.join()) {
                const r = await clickMore(this.driver, ev);
                if (r < 2) {
                    ch = await getSetkaCup(this.driver);
                    evs = await getEvents(ch);
                    for (let ev of evs) {
                        const teams = await getTeams(ev);
                        if (teams.join() === this.event1.teams.join()) {
                            let r = this.event1.set === 5
                                ? await clickMainCoef(this.driver, ev, this.event1.choice)
                                : await clickSetCoef(this.driver, ev, this.event1.set, this.event1.choice);
                            if (r === 1) {
                                await setTimeout(() => {
  console.log("Delayed for 1 second.");},2000);
                                await this.confirm();
                            }
                        }
                    }
                }
            }
        }
        return this.event1;
    }
}
class MakeDessicion {

constructor() {
      this.arr =[];  

    }

md(event1){
if (event1.set == 1 ) {return [0, 0, 0, 1];};

return [0, 0, 0, 0];
}
}
class Loop {
    constructor(n) {
        this.driver = window.document;
        alert("begin construct loop");
        this.ds = new DoStake(this.driver);
        this.n = n;
        this.waited = {};
        this.totalteams = [];
        this.md = new MakeDessicion();
    }

    manageev(event1) {
        let event2 = copy.deepcopy(event1);
        let r = event2.checkscore();
        if (r == 0) {
            this.waited[event2.teams[0]] = event2;
            return event2;
        }
        if (event2.set == event2.betset) {
            this.waited[event2.teams[0]] = event2;
            return event2;
        }
        if (event2.strategy[2] >= event2.strategy[3] && event2.strategy[2] > 0) {
            if (event2.set > 1) {
                try {
                    event2.choice = String(event2.setwin[event2.set - 2]);
                } catch (error) {
                    console.log("event1.set =", event2.set);
                }
                event2.choice = event2.choice == "1" ? "2" : "1";
                event2.betsum = event2.set * 50;
                event2 = this.ds.dostake(event2);
            }
        }

        if (event2.strategy[2] < event2.strategy[3] && event2.strategy[3] > 0) {
            if (event2.set > 1) {
                try {
                    event2.choice = String(event2.setwin[event2.set - 2]);
                } catch (error) {
                    console.log("event1.set =", event2.set);
                }
                event2.betsum = event12.set * 50;
                event2 = this.ds.dostake(event2);
            }
        }

        let t = event2.teams;
        this.waited[t[0]] = event2;
        return event2;
    }

    loop() {
        console.log(this.totalteams);

        let ch = getSetkaCup(this.driver);
        if (ch == null) {
            console.log("setka cup not found");
            return 6;
        }

        let evs = getEvents(ch);
        
        if (evs.length == 0) {
            return 5;
        }

        for (let ev of evs) {
            let teams = getTeams(ev);
            console.log(teams);
            if (this.totalteams.includes(teams)) {
                console.log("loop");
                this.waited[teams[0]].score = getScore(ev);
                this.manageev(this.waited[teams[0]]);
            }
        }

        return 1;
    }

    doloops() {
    	alert("begin loop");
        for (let i = 0; i < this.n; i++) {
            if (i % 4 == 0) {
                this.loopfornew();
            }

            let r = this.loop();
            if (r == 0) {
                console.log("ooooo");
            }

            setTimeout(() => {
  console.log("Delayed for 1 second.");},8000); // sleep in JavaScript is in milliseconds
        }
    }

    loopfornew() {
        let currentteams = [];
        let newwaited = {};

        let ch = getSetkaCup(this.driver);
        let evs = getEvents(ch);
        if (evs.length == 0) {
            return 5;
        }

        for (let ev of evs) {
            let teams = getTeams(ev);
            if (currentteams.includes(teams)) {
                let score1 = getScore(ev);
                if ((score1[1][0] + score1[1][1]) == 0) {
                    continue;
                }
            }
            currentteams.push(teams);
            if (!this.totalteams.includes(teams)) {
                let event1 = new Event();
                event1.teams = getTeams(ev);
                event1.score = getScore(ev);
                event1.strategy = this.md.md(event1);
                newwaited[event1.teams[0]] = event1;
            } else {
                newwaited[teams[0]] = this.waited[teams[0]];
            }
        }

        this.totalteams = [];
        this.waited = {};
        for (let teams of currentteams) {
            this.totalteams.push(teams);
            this.waited[teams[0]] = copy.deepcopy(newwaited[teams[0]]);
        }

        return 1;
    }
}

function disphell() {

let champ = getSetkaCup(document) ;
if (champ ==null) {alert(2);};
let evs =getEvents(champ);
if (evs.length ==0) {alert(3);};
//i=0;
let text1 = "team1";
evs.forEach(ev=>{ let teams =getTeams(ev) ;

//let team = text1.concat(i.toString());
//window.localStorage.setItem(team, teams[0] );


alert(teams[0]);
let r=clickMore(ev);
//alert(r);
let score = getScore(ev) ;
alert(score[0][0]);
let scoef= getSetCoefs(ev);
for  (let key in scoef) {alert(key); alert(scoef[key]);};
});
}

//let n =0;
//let n1=["ooo","ppp","uuu"];
//localStorage.setItem("n", JSON.stringify(n1));
//let r = JSON.parse(localStorage.getItem("n"));
//alert(r);
//r=localStorage.getItem("trythis");
//alert(r);
alert(Date.now());
setTimeout(() => {
  console.log("Delayed for 1 second.");},5000);

currenturl = window.location.href;
alert(currenturl);
if (currenturl !="https://1xbet.kz/en/live/table-tennis/1733171-setka-cup")
{window.location.replace("https://1xbet.kz/en/live/table-tennis/1733171-setka-cup");};
let loop1 = new Loop(10);
setInterval(loop1.doloop(), 9000);
  

   









