import React from "react";
import s from "./App.module.scss";
import {CounterSettings} from "./CounterSettings";
import {CounterTable} from "./CounterTable";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./bll/store";
import {incValueAC, isCountingAC, isErrorAC, maxValueAC, minValueAC, setValueAC} from "./bll/counterReducer";

export const App = () => {
    const value = useSelector<AppStateType, number>(state => state.counter.value)
    const minValue = useSelector<AppStateType, number>(state => state.counter.minValue)
    const maxValue = useSelector<AppStateType, number>(state => state.counter.maxValue)
    const isCounting = useSelector<AppStateType, boolean>(state => state.counter.isCounting)
    const isError = useSelector<AppStateType, boolean>(state => state.counter.isError)
    const dispatch = useDispatch()

    const incValue = () => {
        if (value <= maxValue) {
            dispatch(incValueAC())
        }
    };
    const resetValue = () => {
        dispatch(setValueAC(0))
    }

    const setNewMaxValue = (newMaxValue: number) => {
        dispatch(isCountingAC(false))

        if (newMaxValue < 1 || newMaxValue <= minValue) {
            dispatch(isErrorAC(true));
        } else if (newMaxValue >= 1 && newMaxValue > minValue) {
            dispatch(isErrorAC(false));
            dispatch(maxValueAC(newMaxValue))
        }
    };

    const setNewMinValue = (newMinValue: number) => {
        dispatch(isCountingAC(false))

        if (newMinValue < 0 || maxValue <= newMinValue) {
            dispatch(isErrorAC(true));
        } else if (newMinValue >= 0 && maxValue > newMinValue) {
            dispatch(isErrorAC(false));
            dispatch(minValueAC(newMinValue))
        }
    };

    const setValues = () => {
        dispatch(isCountingAC(true))
        dispatch(setValueAC(minValue));
    };

    return (
        <div className={s.appWrapper}>
            <CounterSettings
                maxValue={maxValue}
                minValue={minValue}
                setNewMinValue={setNewMinValue}
                setNewMaxValue={setNewMaxValue}
                isCounting={isCounting}
                isError={isError}
                setValues={setValues}
            />
            <CounterTable
                value={value}
                maxValue={maxValue}
                minValue={minValue}
                incValue={incValue}
                resetValue={resetValue}
                isCounting={isCounting}
                isError={isError}
            />
        </div>
    );


};