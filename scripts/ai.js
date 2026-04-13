class AI {
    // 0 is pass, 1 is roll

    makeDecision(level, temp, total, otherScores, goal) {
        if (temp == 0) return 1

        if (level == 1) return this.levelI()
        else if (level == 2) return this.levelII(temp, total)
        else return this.levelIII(temp, total, otherScores, goal)
    }

    levelI() {
        return Math.round(Math.random())
    }

    levelII(temp, total) {
        if (temp > total || temp > 20) {
            return 0
        } else {
            return 1
        }
    }

    levelIII(temp, total, otherScores, goal) {
        for (let score of otherScores) {
            if (score < temp + total) { // if ahead of 1 player
                if (temp + total > score + 5) return 1// within 5
            }
            else if (temp > 20) return 0 // falling behind but have a good amount of points
            else if (total + temp > score - 5) return 0 // within 5
            else return 1 // 
        }

        // if cruising in the lead
        if (temp + total > goal + 5) return 1
        return 0
    }
}