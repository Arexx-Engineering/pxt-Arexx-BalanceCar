/**
 * MakeCode extension for Arexx BalanceCar
 *  Author: Sjors Smit
 * Date: January 22nd 2020
 */

enum SensorColors {
    //%block=black
    black = "black",
    //%block=white
    white = "white",
    //%block=Red
    red = "red",
    //%block=Blue
    blue = "blue",
    //%block=green
    green = "green"

}

/**
 * functions for the balanceCar:
 */
//%weight=5 color=#80AF47 icon="\uf110"
//% groups=["MotorControl", "Ultrasonic Sensor", "Colour Sensor"]
namespace BalanceCar {
    //To enable some of the features the LED-matrix on the Micro:Bit has to be disabled, since some of the pins interfere with the connected modules.
    //(Pin 9 for the ultrasonic sensor and Pin 3 for the RGB-LEDs)
    let startUp = 0
    if (!startUp) {
        //The built in LED-display of the Micro:Bit has to be disabled, because of the pins controlling the display are shared with the GPIO pins on the edge connector
        led.enable(false)
        startUp = 1
    }
    /**
     * Blocks for controlling the motors:
     */

    //% block="spin clockwise with speed %Speed" weight=2
    //% group="MotorControl"
    //% Speed.min=0 Speed.max=1023 Speed.defl=1023
    export function spinRight(Speed: number = 1023): void {
        pins.analogWritePin(AnalogPin.P13, Speed)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.analogWritePin(AnalogPin.P15, Speed)
        pins.analogWritePin(AnalogPin.P16, 0)
    }
    //% block="spin counterclockwise with speed %Speed" weight=3
    //% group="MotorControl"
    //% Speed.min=0 Speed.max=1023 Speed.defl=1023
    export function spinLeft(Speed: number = 1023): void {
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, Speed)
        pins.analogWritePin(AnalogPin.P15, 0)
        pins.analogWritePin(AnalogPin.P16, Speed)
    }
    //% block="Drive forwards with speed %Speed" weight=0
    //% group="MotorControl"
    //% Speed.min=0 Speed.max=1023 Speed.defl=1023
    export function forwards(Speed: number = 1023): void {
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, Speed)
        pins.analogWritePin(AnalogPin.P15, Speed)
        pins.analogWritePin(AnalogPin.P16, 0)
    }
    //% block="Drive backwards with speed %Speed" weight=1
    //% group="MotorControl"
    //% Speed.min=0 Speed.max=1023 Speed.defl=1023
    export function backwards(Speed: number = 1023): void {
        pins.analogWritePin(AnalogPin.P13, Speed)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.analogWritePin(AnalogPin.P15, 0)
        pins.analogWritePin(AnalogPin.P16, Speed)
    }
    //% block="turn left" weight=5
    //% group="MotorControl"
    export function turnLeft() {
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, 1023)
        pins.analogWritePin(AnalogPin.P15, 255)
        pins.analogWritePin(AnalogPin.P16, 0)
    }
    //% block="turn right" weight=6
    //% group="MotorControl"
    export function turnRight() {
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, 255)
        pins.analogWritePin(AnalogPin.P15, 1023)
        pins.analogWritePin(AnalogPin.P16, 0)
    }
    //% block="Stop" weight=1
    //% group="MotorControl"
    export function stop() {
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.analogWritePin(AnalogPin.P15, 0)
        pins.analogWritePin(AnalogPin.P16, 0)
    }

    /**
     * Blocks for controlling the ultrasonic Sensor:
     */
    //% block="read distance in cm"
    //% group="Ultrasonic sensor" weight=1
    export function readDistance(): number {
        pins.digitalWritePin(DigitalPin.P8, 0)
        control.waitMicros(2)
        pins.digitalWritePin(DigitalPin.P8, 1)
        control.waitMicros(10)
        pins.digitalWritePin(DigitalPin.P8, 0)

        let distance = pins.pulseIn(DigitalPin.P9, PulseValue.High)

        return (distance / 58) //distance variable is the time it took for the sound, at a speed of 340m/s to travel the distance TWICE.
                               //To convert this to cm, it needs to be multiplied by 0,017, or divided by 58.
    }

    /**
     * Blocks for controlling the colour-sensor
     */

    /**
     * returns the RGB value of the colour under the sensor in 24-bit color mode
     * compatible to export to neopixels
     */
    //% block="read RGB-value"
    //% group="Colour Sensor"
    // @param samples the amount of samples to take
    export function readRGB(samples:number=10): number {
        let output: number
        let readValue:number
        let readAverage: number

        //Set colour mode to Red:
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(2)
        for(let i=0; i<samples; i++){
            readValue += pins.pulseIn(DigitalPin.P2, PulseValue.High, 100)
            control.waitMicros(2)
            serial.writeNumber(i)
            serial.writeValue(" RED ", readValue)
        }
        //divide the total number by the amount of samples to get an average.
        readAverage=(readValue/samples) 
        //serial.writeString("Red: ")
        //serial.writeNumber(frequency)
        Math.constrain(readAverage, 20,80)
        //map the read value (in microseconds) to an 8-bit number and shift it to the leftmost position in a 24-bit number.
        output |= Math.map(readAverage, 20, 80, 255, 0) << 16
        basic.pause(2)

        //Reset the read value
        readValue=0
        readAverage=0
        //Set Colour mode to Green
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(2)
        for(let i=0; i<samples; i++){
            readValue += pins.pulseIn(DigitalPin.P2, PulseValue.High,100)
            control.waitMicros(2)
            serial.writeNumber(i)
            serial.writeValue(" Green ", readValue)
        }
        //map the read value (in microseconds) to an 8-bit number and shift it to the middle position in a 24-bit number.
        readAverage=(readValue/samples) 
        //serial.writeString(" Green: ")
        //serial.writeNumber(frequency)
        Math.constrain(readAverage, 30, 90)
        output |= Math.map(readAverage, 30, 90, 255, 0) << 8
        basic.pause(2)

        //Set Colour mode to blue
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(2)
        for(let i=0; i<samples; i++){
            readValue += pins.pulseIn(DigitalPin.P2, PulseValue.High,100)
            control.waitMicros(2)
            serial.writeNumber(i)
            serial.writeValue(" BLUE ", readValue)
        }
        readAverage=(readValue/samples) 
        //serial.writeString(" Blue: ")
        //serial.writeNumber(frequency)
        Math.constrain(readAverage, 20 ,80)
                //map the read value (in microseconds) to an 8-bit number
        output |= Math.map(readAverage, 20, 80, 255, 0)
        basic.pause(2)

        return output
    }
    /**
     * Reads the colour underneath the colour sensor and returns as a string
     */
    //% block="Read colour"
    //% group="Colour Sensor" weigth=10
    export function readColour(): string {
        let colour: string
        let output: number = 0
        let frequency: number = 0
        let RED: boolean = false
        let GREEN: boolean = false
        let BLUE: boolean = false
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(2)
        //To reduce colour-read-errors, 5 measurements are taken and averaged.
        let frequency1 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        let frequency2 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        let frequency3 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        let frequency4 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        let frequency5 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        frequency = (frequency1 + frequency2 + frequency3 + frequency4 + frequency5) / 5
        if (frequency < 50) { RED = true }
        basic.pause(2)

        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(2)
        //To reduce colour-read-errors, 5 measurements are taken and averaged.
        frequency1 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        frequency2 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        frequency3 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        frequency4 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        frequency5 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        frequency = (frequency1 + frequency2 + frequency3 + frequency4 + frequency5) / 5
        if (frequency < 80) { GREEN = true }
        basic.pause(2)

        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(2)
        //To reduce colour-read-errors, 5 measurements are taken and averaged.
        frequency1 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        frequency2 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        frequency3 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        frequency4 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        frequency5 = pins.pulseIn(DigitalPin.P2, PulseValue.High)
        control.waitMicros(4)
        frequency = (frequency1 + frequency2 + frequency3 + frequency4 + frequency5) / 5
        if (frequency < 70) { BLUE = true }
        basic.pause(2)
        if (RED && !BLUE && !GREEN) { colour = "red" }
        if (!RED && BLUE && !GREEN) { colour = "blue" }
        if (!RED && !BLUE && GREEN) { colour = "green" }
        if (RED && BLUE && GREEN) { colour = "white" }
        if (!RED && !BLUE && !GREEN) { colour = "black" }
        if (RED && BLUE && !GREEN) { colour = "purple" }
        if (RED && !BLUE && GREEN) { colour = "yellow" }
        if (!RED && BLUE && GREEN) { colour = "cyan" }
        return colour
    }
}
