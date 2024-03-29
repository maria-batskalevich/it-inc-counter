import React from "react";
import {Button} from "./Button";
import s from './App.module.scss'


type CounterTableauPropsType = {
    value: number;
    maxValue: number;
    minValue: number;
    incValue: () => void;
    resetValue: () => void;
    isCounting: boolean;
    isError: boolean;
};

export function CounterTable(props: CounterTableauPropsType) {
    return (
        <div className={s.app}>
            <div className={s.tableWrapper}>
                {props.isCounting ? (
                    <>
                        <div className={s.counter}>{props.value}</div>
                        <div className={s.buttons}>
                            <Button
                                buttonValue={"inc"}
                                onClickHandler={props.incValue}
                                buttonDisabled={props.value === props.maxValue}
                            />
                            <Button
                                buttonValue={"reset"}
                                onClickHandler={props.resetValue}
                                buttonDisabled={props.value === props.minValue}
                            />
                        </div>


                    </>
                ) : (
                    <>
                        <div className={s.counter}>
            <span className={props.isError ? s.textError : s.textDisabled}>
              {props.isError
                  ? "Incorrect value!"
                  : `Enter values and press "set"`}
            </span>
                        </div>
                        <div className={s.buttons}>

                            <Button
                                buttonValue={"inc"}
                                onClickHandler={props.incValue}
                                buttonDisabled={true}
                            />


                            <Button
                                buttonValue={"reset"}
                                onClickHandler={props.resetValue}
                                buttonDisabled={true}
                            />
                        </div>

                    </>
                )}
            </div>

        </div>
    );
}