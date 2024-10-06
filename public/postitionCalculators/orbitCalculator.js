export class OrbitCalculator {
    constructor(
        body, parameters
    ) {
        this.body = body;
        this.params = parameters
        this.time = undefined;
    }
    get_position(time) {
        if (this.time === time && this.body.is_position_set()) {
            return this.body.get_position();
        }
        this.time = time;
        this.params.update_time(time);
        // update argument of pericenter
        this.aop = this.params.lp - this.params.ln;

        // update mean anomaly
        this.ma = this.params.lp - this.params.L; 
        this.compute_eccentric_anomaly();

        // body's heliocentric coordinates in orbital plane
        let x1 = this.params.sma * (Math.cos(this.ea) - this.params.e);
        let y1 = this.params.sma * Math.sqrt(1 - this.params.e ** 2) * Math.sin(this.ea);

        // body's absolute coordinates
        let cosO = Math.cos(this.params.ln);
        let sinO = Math.sin(this.params.ln);
        let coso = Math.cos(this.aop);
        let sino = Math.sin(this.aop);
        let cosI = Math.cos(this.params.i);
        let sinI = Math.sin(this.params.i);
        let x = (coso * cosO - sino * sinO * cosI) * x1 +
        (-sino * cosO - coso * sinO * cosI) * y1;
        
        let y = (coso * sinO + sino * cosO * cosI) * x1 +
            (-sino * sinO + coso * cosO * cosI) * y1;

        let z = (sino * sinI) * x1 +
            (coso * sinI) * y1;
        return [x, y, z]
    }

    update_time(time) {
        let cords = this.get_position(time);
        this.body.x = cords[0];
        this.body.y = cords[1];
        this.body.z = cords[2];
    }

    compute_eccentric_anomaly() {
        let tolerance = 10 ** -6; // ADJUST FOR SPEED UP
        let ea0 = this.ma + this.params.e * Math.sin(this.ma);
        let dE = 0;
        let dM = 0;
        this.ea = ea0;
        do {
            dM = this.ma - (this.ea - this.params.e * this.ea);
            dE = dM / (1 - this.params.e * Math.cos(this.ea));
            this.ea = ea0 + dE;
        }
        while (Math.abs(dE) <= tolerance);
    }

}