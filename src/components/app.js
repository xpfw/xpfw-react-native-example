/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import FormApp from './form'
import DataApp from './data'
import { observer } from "mobx-react"
import { observable } from "mobx"

let useForm = observable.box(false)

const ScreenSwitcher = observer(() => {
  let ToShow = useForm.get() === true ? FormApp : DataApp
  return (
    <ToShow />
  )
})

export default ScreenSwitcher
export {
  useForm
}
