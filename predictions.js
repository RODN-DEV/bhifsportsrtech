// ==================== PREDICTIONS DATABASE ====================

const predictionDB = {
    "LOW RISK PLAN": {
        "2026-02-26": [
            { sport: "volleyball", league: "Liga 1", country: "Poland", teams: "Jaworzno vs Siedlce", tip: "Jaworzno Win", status: "lost", score: "1-3", kickoff: "2026-02-26T19:00:00Z", odds: 1.461 }
        ],
        "2026-02-25": [
            { sport: "football", league: "Champions League", country: "Europe", teams: "Real Madrid vs Benfica", tip: "Real Madrid 1-3 Goals", status: "won", score: "2-1", kickoff: "2026-02-25T20:00:00Z", odds: 1.35 }
        ],
        "2026-02-24": [
            { sport: "icehockey", league: "Swiss League - Play Off", country: "Switzerland", teams: "Thurgan vs EHC Olten", tip: "Under 6.5 Goals", status: "lost", score: "3-6", kickoff: "2026-02-24T18:45:00Z", odds: 1.31 }
        ],
        "2026-02-23": [
            { sport: "icehockey", league: "Hockeyallsvenskan", country: "Sweden", teams: "Trojan Ljungby vs Sodertalje", tip: "Under 6.5 Goals", status: "won", score: "1-1", kickoff: "2026-02-23T18:00:00Z", odds: 1.28 }
        ],
        "2026-02-22": [
            { sport: "volleyball", league: "PulsLiga", country: "Poland", teams: "Barko vs CHKS Chelm", tip: "Over 152.5 Points", status: "won", score: "3-1", kickoff: "2026-02-22T19:00:00Z", odds: 1.40 }
        ],
        "2026-02-21": [
            { sport: "football", league: "Laliga", country: "Spain", teams: "Osasuna vs Real Madrid", tip: "MultiGoals 2-4", status: "won", score: "2-1", kickoff: "2026-02-21T17:30:00Z", odds: 1.55 }
        ],
        "2026-02-20": [
            { sport: "football", league: "League 1", country: "France", teams: "Stade Brest vs Marseille", tip: "Draw or Marseille & Over 1.5 Goals", status: "lost", score: "2-0", kickoff: "2026-02-20T19:45:00Z", odds: 1.65 }
        ],
        "2026-02-19": [
            { sport: "football", league: "Liga Alef South", country: "Israel", teams: "Shimshon Tel Aviv vs Kfar Saba", tip: "MultiGoals 2-4", status: "lost", score: "0-0", kickoff: "2026-02-19T18:30:00Z", odds: 1.537 }
        ]
    },

    "HIGH RISK PLAN": {
        "2026-02-26": [
            { sport: "volleyball", league: "Liga 1", country: "Poland", teams: "Jaworzno vs Siedlce", tip: "Over 181.5 Points", status: "won", score: "1-3", kickoff: "2026-02-26T19:00:00Z", odds: 1.75 }
        ],
        "2026-02-25": [
            { sport: "football", league: "Champions League", country: "Europe", teams: "Real Madrid vs Benfica", tip: "Real Madrid Win", status: "won", score: "2-1", kickoff: "2026-02-25T20:00:00Z", odds: 1.724 }
        ],
        "2026-02-24": [
            { sport: "icehockey", league: "Swiss League - Play Off", country: "Switzerland", teams: "Thurgan vs EHC Olten", tip: "Draw or EHC Olten Win", status: "won", score: "3-6", kickoff: "2026-02-24T18:45:00Z", odds: 1.60 }
        ],
        "2026-02-23": [
            { sport: "icehockey", league: "Hockeyallsvenskan", country: "Sweden", teams: "Trojan Ljungby vs Sodertalje", tip: "Sodertalje Win", status: "lost", score: "1-1", kickoff: "2026-02-23T18:00:00Z", odds: 1.75 }
        ],
        "2026-02-22": [
            { sport: "volleyball", league: "PulsLiga", country: "Poland", teams: "Barko vs CHKS Chelm", tip: "Barko Win & Over 140.5 Points", status: "won", score: "3-1", kickoff: "2026-02-22T19:00:00Z", odds: 1.88 }
        ],
        "2026-02-21": [
            { sport: "football", league: "Laliga", country: "Spain", teams: "Osasuna vs Real Madrid", tip: "Both Teams To Score & Under 4.5 Goals", status: "won", score: "2-1", kickoff: "2026-02-21T17:30:00Z", odds: 2.32 }
        ],
        "2026-02-20": [
            { sport: "football", league: "League 1", country: "France", teams: "Stade Brest vs Marseille", tip: "Marseille Win", status: "lost", score: "2-0", kickoff: "2026-02-20T19:45:00Z", odds: 2.12 }
        ],
        "2026-02-19": [
            { sport: "football", league: "Liga Alef South", country: "Israel", teams: "Shimshon Tel Aviv vs Kfar Saba", tip: "Draw or Kfar Saba", status: "won", score: "0-0", kickoff: "2026-02-19T18:30:00Z", odds: 1.71 }
        ]
    },

    "SILVER PLAN": {
        "2026-02-26": [
            { sport: "football", league: "Europa League - Play Offs", country: "Europe", teams: "Viktoria Plzen vs Panathinaikos", tip: "MultiGoals 1-3", status: "won", score: "1-1", kickoff: "2026-02-26T17:45:00Z", odds: 1.40 },
            { sport: "football", league: "Brasileiro U20", country: "Brazil", teams: "Bahia vs Corinthians", tip: "Draw or Corinthians Win", status: "won", score: "2-2", kickoff: "2026-02-26T18:00:00Z", odds: 1.71 }
        ],
        "2026-02-25": [
            { sport: "football", league: "National League- South", country: "England", teams: "Farnborough vs Chippenham", tip: "Farnborough Win", status: "won", score: "2-1", kickoff: "2026-02-25T19:45:00Z", odds: 2.17 }
        ],
        "2026-02-24": [
            { sport: "football", league: "Champions League - Play Off", country: "Europe", teams: "Atletico Madrid vs Club Brugge", tip: "Both Teams To Score & Under 5.5 Goals", status: "won", score: "4-1", kickoff: "2026-02-24T17:45:00Z", odds: 2.00 }
        ],
        "2026-02-23": [
            { sport: "icehockey", league: "Hockeyallsvenskan", country: "Sweden", teams: "Trojan Ljungby vs Sodertalje", tip: "Draw or Sodertalje Win & Under 5.5 Goals", status: "won", score: "1-1", kickoff: "2026-02-23T18:00:00Z", odds: 2.44 }
        ],
        "2026-02-22": [
            { sport: "football", league: "Jupiler Pro League", country: "Belgium", teams: "Waregem vs Anderlecht", tip: "Waregem 2-3 Goals", status: "won", score: "2-4", kickoff: "2026-02-22T17:30:00Z", odds: 2.47 }
        ],
        "2026-02-21": [
            { sport: "football", league: "Egypt Cup", country: "Egypt", teams: "Telecom Egypt vs ENPPI", tip: "Both Teams To Score & Telecom Egypt Over 0.5 Goals", status: "lost", score: "0-0", kickoff: "2026-02-21T19:30:00Z", odds: 2.75 }
        ],
        "2026-02-20": [
            { sport: "icehockey", league: "Ice Hockey League", country: "Austria", teams: "Bolzano vs Graz99ers", tip: "Draw or Graz99ers Win", status: "lost", score: "4-0", kickoff: "2026-02-20T18:45:00Z", odds: 1.55 },
            { sport: "football", league: "Laliga", country: "Spain", teams: "Athletic Bilbao vs Elche", tip: "MultiGoals 2-4", status: "won", score: "2-1", kickoff: "2026-02-20T20:00:00Z", odds: 1.55 }
        ],
        "2026-02-19": [
            { sport: "football", league: "Division 1", country: "Saudi Arabia", teams: "Al Adahl vs Club Jeddah", tip: "MultiGoals 1-3", status: "lost", score: "2-2", kickoff: "2026-02-19T18:45:00Z", odds: 1.462 },
            { sport: "football", league: "Division 1", country: "Saudi Arabia", teams: "Al Jubail Club vs Al Batin", tip: "MultiGoals 1-3", status: "won", score: "1-0", kickoff: "2026-02-19T18:45:00Z", odds: 1.475 }
        ]
    },

    "GOLD PLAN": {
        "2026-02-26": [
            { sport: "football", league: "Conference League - Play Offs", country: "Europe", teams: "Fiorentina vs Jagiellonia", tip: "Jagiellonia 1-3 Goals", status: "won", score: "0-3", kickoff: "2026-02-26T17:45:00Z", odds: 1.55 },
            { sport: "football", league: "Europa League - Play Offs", country: "Europe", teams: "Viktoria Plzen vs Panathinaikos", tip: "MultiGoals 1-3", status: "won", score: "1-1", kickoff: "2026-02-26T17:45:00Z", odds: 1.40 },
            { sport: "football", league: "Brasileiro U20", country: "Brazil", teams: "Bahia vs Corinthians", tip: "Draw or Corinthians Win", status: "won", score: "2-2", kickoff: "2026-02-26T18:00:00Z", odds: 1.71 }
        ],
        "2026-02-25": [
            { sport: "football", league: "Champions League", country: "Europe", teams: "Real Madrid vs Benfica", tip: "MultiScores 2-1, 3-1 or 4-1", status: "won", score: "2-1", kickoff: "2026-02-25T20:00:00Z", odds: 3.50 }
        ],
        "2026-02-24": [
            { sport: "football", league: "Champions League - Play Off", country: "Europe", teams: "Atletico Madrid vs Club Brugge", tip: "Both Teams To Score & Under 5.5 Goals", status: "won", score: "4-1", kickoff: "2026-02-24T17:45:00Z", odds: 2.00 },
            { sport: "icehockey", league: "Swiss League - Play Off", country: "Switzerland", teams: "Thurgan vs EHC Olten", tip: "Draw or EHC Olten Win", status: "won", score: "3-6", kickoff: "2026-02-24T18:45:00Z", odds: 1.60 }
        ],
        "2026-02-23": [
            { sport: "icehockey", league: "Metal Ligaen", country: "Denmark", teams: "Esbjerg vs Rungsted", tip: "Under 7.5 Goals", status: "won", score: "3-3", kickoff: "2026-02-23T18:00:00Z", odds: 1.57 },
            { sport: "icehockey", league: "Hockeyallsvenskan", country: "Sweden", teams: "Trojan Ljungby vs Sodertalje", tip: "Draw or Sodertalje Win & Under 5.5 Goals", status: "won", score: "1-1", kickoff: "2026-02-23T18:00:00Z", odds: 2.44 }
        ],
        "2026-02-22": [
            { sport: "football", league: "Primera RFEF - Group 2", country: "Spain", teams: "Murcia vs Cartagena", tip: "Cartagena 1-2 Goals", status: "won", score: "1-2", kickoff: "2026-02-22T17:15:00Z", odds: 1.92 },
            { sport: "football", league: "Jupiler Pro League", country: "Belgium", teams: "Waregem vs Anderlecht", tip: "Waregem 2-3 Goals", status: "won", score: "2-4", kickoff: "2026-02-22T17:30:00Z", odds: 2.47 }
        ],
        "2026-02-21": [
            { sport: "football", league: "Bundesliga 2", country: "Germany", teams: "Schalke 04 vs Magdeburg", tip: "Both Teams To Score", status: "won", score: "5-3", kickoff: "2026-02-21T19:30:00Z", odds: 1.56 },
            { sport: "football", league: "Egypt Cup", country: "Egypt", teams: "Telecom Egypt vs ENPPI", tip: "Telecom Egypt Over 0.5 Goals", status: "lost", score: "0-0", kickoff: "2026-02-21T19:30:00Z", odds: 1.86 }
        ],
        "2026-02-20": [
            { sport: "icehockey", league: "Ice Hockey League", country: "Austria", teams: "Bolzano vs Graz99ers", tip: "Draw or Graz99ers Win", status: "lost", score: "4-0", kickoff: "2026-02-20T18:45:00Z", odds: 1.65 },
            { sport: "football", league: "Laliga", country: "Spain", teams: "Athletic Bilbao vs Elche", tip: "MultiGoals 2-4", status: "won", score: "2-1", kickoff: "2026-02-20T20:00:00Z", odds: 1.63 },
            { sport: "icehockey", league: "Olympic Games", country: "International", teams: "USA vs Slovakia", tip: "Over 4.5 Goals", status: "won", score: "6-2", kickoff: "2026-02-20T20:10:00Z", odds: 1.42 }
        ],
        "2026-02-19": [
            { sport: "football", league: "Europa League", country: "Europe", teams: "PAOK vs Celta Vigo", tip: "Celta Vigo 1-3 Goals", status: "won", score: "1-2", kickoff: "2026-02-19T17:45:00Z", odds: 1.43 },
            { sport: "football", league: "Premier League", country: "Bahrain", teams: "Club A'ali vs Al-Shabab", tip: "MultiGoals 1-2", status: "won", score: "0-1", kickoff: "2026-02-19T18:00:00Z", odds: 1.925 }
        ]
    },

    "DIAMOND PLAN": {
        "2026-02-26": [
            { sport: "football", league: "Conference League - Play Offs", country: "Europe", teams: "Fiorentina vs Jagiellonia", tip: "Jagiellonia 1-3 Goals", status: "won", score: "0-3", kickoff: "2026-02-26T17:45:00Z", odds: 1.55 },
            { sport: "football", league: "Europa League - Play Offs", country: "Europe", teams: "Viktoria Plzen vs Panathinaikos", tip: "MultiGoals 1-3", status: "won", score: "1-1", kickoff: "2026-02-26T17:45:00Z", odds: 1.40 },
            { sport: "football", league: "Brasileiro U20", country: "Brazil", teams: "Bahia vs Corinthians", tip: "MultiGoals 3-4", status: "won", score: "2-2", kickoff: "2026-02-26T18:00:00Z", odds: 3.47 }
        ],
        "2026-02-25": [
            { sport: "football", league: "National League- South", country: "England", teams: "Farnborough vs Chippenham", tip: "Farnborough Win", status: "won", score: "2-1", kickoff: "2026-02-25T19:45:00Z", odds: 2.17 },
            { sport: "football", league: "Champions League", country: "Europe", teams: "Real Madrid vs Benfica", tip: "MultiScores 2-1, 3-1 or 4-1", status: "won", score: "2-1", kickoff: "2026-02-25T20:00:00Z", odds: 3.50 }
        ],
        "2026-02-24": [
            { sport: "icehockey", league: "EHL", country: "Norway", teams: "Narvik IK vs Frisk Asker", tip: "1st Period Over 1.5 Goals", status: "won", score: "1-3", kickoff: "2026-02-24T17:30:00Z", odds: 1.89 },
            { sport: "football", league: "Champions League - Play Off", country: "Europe", teams: "Atletico Madrid vs Club Brugge", tip: "Both Teams To Score & Under 5.5 Goals", status: "won", score: "4-1", kickoff: "2026-02-24T17:45:00Z", odds: 2.00 },
            { sport: "football", league: "Brasileiro U20", country: "Brazil", teams: "Athletico PR vs Cuiba", tip: "Athletico PR Over 1.5 Goals", status: "won", score: "2-0", kickoff: "2026-02-24T18:00:00Z", odds: 2.02 }
        ],
        "2026-02-23": [
            { sport: "icehockey", league: "Metal Ligaen", country: "Denmark", teams: "Esbjerg vs Rungsted", tip: "Under 7.5 Goals", status: "won", score: "3-2", kickoff: "2026-02-23T18:00:00Z", odds: 1.57 },
            { sport: "icehockey", league: "Hockeyallsvenskan", country: "Sweden", teams: "Trojan Ljungby vs Sodertalje", tip: "Draw or Sodertalje Win & Under 5.5 Goals", status: "won", score: "1-2", kickoff: "2026-02-23T18:00:00Z", odds: 2.44 },
            { sport: "football", league: "Ligat Ha'al", country: "Israel", teams: "Netanya vs Beita Jerusalem", tip: "Beita Jerusalem Win", status: "won", score: "2-8", kickoff: "2026-02-23T18:30:00Z", odds: 2.22 }
        ],
        "2026-02-22": [
            { sport: "football", league: "Primera RFEF - Group 2", country: "Spain", teams: "Murcia vs Cartagena", tip: "Cartagena 1-2 Goals", status: "won", score: "1-2", kickoff: "2026-02-22T17:15:00Z", odds: 1.92 },
            { sport: "icehockey", league: "Elite League", country: "United Kingdom", teams: "Coventry vs Manchester", tip: "Draw or Manchester", status: "won", score: "1-1", kickoff: "2026-02-22T17:30:00Z", odds: 1.87 },
            { sport: "football", league: "Jupiler Pro League", country: "Belgium", teams: "Waregem vs Anderlecht", tip: "Waregem 2-3 Goals", status: "won", score: "2-4", kickoff: "2026-02-22T17:30:00Z", odds: 2.47 },
            { sport: "volleyball", league: "PulsLiga", country: "Poland", teams: "Barko vs CHKS Chelm", tip: "Over 152.5 Points", status: "won", score: "3-1", kickoff: "2026-02-22T19:00:00Z", odds: 1.40 }
        ],
        "2026-02-21": [
            { sport: "football", league: "Laliga", country: "Spain", teams: "Osasuna vs Real Madrid", tip: "Both Teams To Score & Under 4.5 Goals", status: "won", score: "2-1", kickoff: "2026-02-21T17:30:00Z", odds: 2.32 },
            { sport: "football", league: "Bundesliga 2", country: "Germany", teams: "Schalke 04 vs Magdeburg", tip: "Both Teams To Score & Over 2.5 Goals", status: "won", score: "5-3", kickoff: "2026-02-21T19:30:00Z", odds: 2.00 },
            { sport: "football", league: "Premier League", country: "England", teams: "Manchester City vs Newcastle", tip: "MultiGoals 3-5", status: "won", score: "2-1", kickoff: "2026-02-21T20:00:00Z", odds: 1.86 }
        ],
        "2026-02-20": [
            { sport: "football", league: "Primera RFEF - Group 2", country: "Spain", teams: "Real Betis B vs Villarreal B", tip: "Villarreal B Win", status: "won", score: "1-4", kickoff: "2026-02-20T19:30:00Z", odds: 2.65 },
            { sport: "football", league: "Laliga", country: "Spain", teams: "Athletic Bilbao vs Elche", tip: "MultiGoals 2-4", status: "won", score: "2-1", kickoff: "2026-02-20T20:00:00Z", odds: 1.63 },
            { sport: "icehockey", league: "Olympic Games", country: "International", teams: "USA vs Slovakia", tip: "Over 5.5 Goals", status: "won", score: "6-2", kickoff: "2026-02-20T20:10:00Z", odds: 1.85 }
        ],
        "2026-02-19": [
            { sport: "football", league: "Europa League", country: "Europe", teams: "PAOK vs Celta Vigo", tip: "Celta Vigo Win", status: "won", score: "1-2", kickoff: "2026-02-19T17:45:00Z", odds: 2.75 },
            { sport: "football", league: "Premier League", country: "Bahrain", teams: "Club A'ali vs Al-Shabab", tip: "MultiGoals 1-2", status: "won", score: "0-1", kickoff: "2026-02-19T18:00:00Z", odds: 1.925 },
            { sport: "football", league: "Division 1", country: "Saudi Arabia", teams: "Al Jubail Club vs Al Batin", tip: "MultiGoals 1-3", status: "won", score: "1-0", kickoff: "2026-02-19T18:45:00Z", odds: 1.475 }
        ]
    }
};
