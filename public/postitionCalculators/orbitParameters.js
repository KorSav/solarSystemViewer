export class OrbitParameters{
    constructor(){
        this.time = undefined;

        this.sma_0 = undefined; // half of major Axis (size of orbit)
        this.sma_d = undefined;

        this.e_0 = undefined; // |focs|/semiMajorAxis (shape of orbit)
        this.e_d = undefined;

        this.i_0 = undefined; // angle btw equatorial plane and orbit (tilt of orbit)
        this.i_d = undefined;

        this.L_0 = undefined; // mean longitude
        this.L_d = undefined;

        this.ln_0 = undefined; // angle btw vernal equinox and nodes (swivel of orbit)
        this.ln_d = undefined;

        this.lp_0 = undefined; // arg of pericenter + ln
        this.lp_d = undefined;
    }

    from_params(
        semiMajorAxis_0, semiMajorAxis_d, // _d stands for increase for century 
        eccentricity_0, eccentricity_d, // in radians
        inclination_0, inclination_d, // in degrees
        longMean_0, longMean_d, // in degrees
        longPeri_0, longPeri_d, // in degrees
        longNode_0, longNode_d, // in degrees
        revolution_time
    ){
        this.sma_0 = semiMajorAxis_0; // half of major Axis (size of orbit)
        this.sma_d = semiMajorAxis_d;
        this.sma = undefined;

        this.e_0 = eccentricity_0; // |focs|/semiMajorAxis (shape of orbit)
        this.e_d = eccentricity_d;
        this.e = undefined;

        this.i_0 = inclination_0 * 0.01745329; // angle btw equatorial plane and orbit (tilt of orbit)
        this.i_d = inclination_d * 0.01745329;
        this.i = undefined;

        this.L_0 = longMean_0 * 0.01745329; // mean longitude
        this.L_d = longMean_d * 0.01745329;
        this.L = undefined;

        this.ln_0 = longNode_0 * 0.01745329; // angle btw vernal equinox and nodes (swivel of orbit)
        this.ln_d = longNode_d * 0.01745329;
        this.ln = undefined;

        this.lp_0 = longPeri_0 * 0.01745329; // arg of pericenter + ln
        this.lp_d = longPeri_d * 0.01745329;
        this.lp = undefined;

        this.revolution_time = revolution_time

        return this;
    }

    update_time(time){
        // update orbit config according to date
        let t = (time - 2451545.0) / 36525;
        this.sma = this.sma_0 + this.sma_d * t;
        this.e = this.e_0 + this.e_d * t;
        this.i = this.i_0 + this.i_d * t;
        this.L = this.L_0 + this.L_d * t;
        this.ln = this.ln_0 + this.ln_d * t;
        this.lp = this.lp_0 + this.lp_d * t;
    }
}