/**
 * MakeCode extension for Arexx BalanceCar
 *  Author: Sjors Smit
 * Date: January 22nd 2020
 */

/**
 * functions for the balanceCar:
 */
//%weight=5 color=#80FF27 icon="\uf110"
namespace BalanceCar{
    //% block="turn Left" weight=2
    export function turnLeft() {
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
    //% block="turn Right" weight=3
    export function turnRight() {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 1)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 1)
    }
    //% block="forwards" weight=0
    export function forwards() {

        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 1)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
    //% block="backwards" weight=1
    export function backwards() {
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 1)
    }
}