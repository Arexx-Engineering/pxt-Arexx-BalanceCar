/**
 * MakeCode extension for Arexx BalanceCar
 *  Author: Sjors Smit
 * Date: January 22nd 2020
 */

/**
 * functions for the balanceCar:
 */
//%weight=5 color=#80AF47 icon="\uf110"
//% groups=["MotorControl", "Ultrasonic Sensor", "Colour Sensor"]
namespace BalanceCar {
    /**
     * Blocks for controlling the motors:
     */

    //% block="spin clockwise" weight=2
    //% group="MotorControl"
    export function spinRight(): void {
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
    //% block="spin counterclockwise" weight=3
    //% group="MotorControl"
    export function spinLeft(): void {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 1)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 1)
    }
    //% block="forwards" weight=0
    //% group="MotorControl"
    export function forwards(): void {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 1)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
    //% block="backwards" weight=1
    //% group="MotorControl"
    export function backwards(): void {
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 1)
    }
    //% block="turn left" weight=5
    //% group="MotorControl"
    export function turnLeft() {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, 1023)
        pins.analogWritePin(AnalogPin.P15, 512)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
    //% block="turn right" weight=6
    //% group="MotorControl"
    export function turnRight() {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, 512)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
    //% block="Stop" weight=1
    //% group="MotorControl"
    export function stop() {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
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

        return (distance / 58)
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
    export function readRGB(): number {
        let frequency: number = 0
        let output: number = 0
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(1)
        frequency = pins.pulseIn(DigitalPin.P2, PulseValue.Low)
        //serial.writeString("Red: ")
        //serial.writeNumber(frequency)
        if (frequency < 40) { frequency = 40 }
        if (frequency > 110) { frequency = 110 }
        output |= Math.map(frequency, 40, 110, 255, 0) << 16
        basic.pause(10)

        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(1)
        frequency = pins.pulseIn(DigitalPin.P2, PulseValue.Low)
        //serial.writeString(" Green: ")
        //serial.writeNumber(frequency)
        if (frequency < 30) { frequency = 30 }
        if (frequency > 110) { frequency = 110 }
        output |= Math.map(frequency, 30, 110, 255, 0) << 8
        basic.pause(10)

        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(1)
        frequency = pins.pulseIn(DigitalPin.P2, PulseValue.Low)
        //serial.writeString(" Blue: ")
        //serial.writeNumber(frequency)
        if (frequency < 40) { frequency = 40 }
        if (frequency > 110) { frequency = 110 }
        output |= Math.map(frequency, 40, 110, 255, 0)
        basic.pause(10)

        return output
    }
}