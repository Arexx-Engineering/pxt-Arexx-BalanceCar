/**
 * MakeCode extension for Arexx BalanceCar
 *  Author: Sjors Smit
 * Date: January 22nd 2020
 */

/**
 * functions for the balanceCar:
 */
//%weight=5 color=#80AF47 icon="\uf110"
//% groups=["MotorControl", "Ultrasonic Sensor"]
namespace BalanceCar {
    /**
     * Blocks for controlling the motors:
     */

    //% block="turn Left" weight=2
    //% group="MotorControl"
    export function turnLeft(): void {
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
    //% block="turn Right" weight=3
    //% group="MotorControl"
    export function turnRight(): void {
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
        let colour
        return colour
    }
}