import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import InputForm1 from './Forms/InputForm1'
import InputForm2 from './Forms/InputForm2'
import InputForm3 from './Forms/InputForm3'

const STEP_TITLES = ['General Information', 'Park Schedule', 'Picture Upload'];

class AdminStepper extends Component
{
  state =
  {
    activeStep: 0,
    parkName: '',
    parkAddress: '',
    minGen: '',
    maxGen: '',
    days: Array(7).fill({min: '', max: ''}),
    imgFile: null
  }

  handleNext = () =>
  {
    this.setState({activeStep: this.state.activeStep + 1});
  }

  handleBack = () =>
  {
    this.setState({activeStep: this.state.activeStep - 1});
  }

  handleChangeForm1 = (id, value) =>
  {
    this.setState({[id]: value});
  }

  handleChangeFormGen = (id, value) =>
  {
    this.setState({[id]: value});
  }
  
  handleSubmit = () =>
  {
    console.log(this.state) //send to the backend
  }

  handleChangeForm2 = (id, day, value) =>
  {
    let daysArray = JSON.parse(JSON.stringify(this.state.days));

    if(id === 'disable')
    {
      if (value) {daysArray[day] = null;}
      else {daysArray[day] = {min: '', max: ''};}
      this.setState({days: daysArray});
    }
    else
    {
      daysArray[day][id] = value;
      this.setState({days: daysArray});
    }
  }

  handleApplyAll = () =>
  {
    const daysArray = Array(7).fill({min: this.state.minGen, max: this.state.maxGen});
    this.setState({days: daysArray});
  }

  render()
  {
    const {classes} = this.props;

    const form = (activeStep) =>
    {
      switch (activeStep)
      {
        case 0:
        {
          return (
            <InputForm1
              clickedNext = {this.handleNext}
              stateObj = {this.state}
              change = {this.handleChangeForm1}
            />
          );
        }
        case 1:
        {
          return (
            <InputForm2
              clickedNext = {this.handleNext}
              clickedBack = {this.handleBack}
              stateObj = {this.state}
              change = {this.handleChangeForm2} 
              changeGen = {this.handleChangeFormGen}
              applyAll = {this.handleApplyAll}
            />
          );
        }
        case 2:
        {
          return (
            <InputForm3
              clickedNext = {this.handleNext}
              clickedBack = {this.handleBack}
              stateObj = {this.state}
              fileUpload = {(file) => {this.setState({imgFile: file});}}
            />
          );
        }
        default:
        {
          return (
            <div>
                <Typography className = {classes.confirmation}>
                    All steps are completed. Do you wish to submit data or go back?
                </Typography>
                <div>
                    <Button
                      onClick = {this.handleBack}
                      className = {classes.button}>
                        Back
                    </Button>
                    <Button
                      variant = 'contained'
                      onClick = {this.handleSubmit}
                      color = 'primary'
                      className = {classes.button}>
                        Submit
                    </Button>
                </div>
            </div>
          );
        }
      }
    }

    return (
      <div className = {classes.root}>
        <Stepper activeStep = {this.state.activeStep} className = {classes.stepper}>
          {
            STEP_TITLES.map((label) =>
            {
              return (
                <Step key = {label}>
                  <StepLabel> {label} </StepLabel>
                </Step>
              );
            })
          }
        </Stepper>
        <div className = {classes.divider}/>
        {form(this.state.activeStep)}
      </div>
    );
  }
}

const styles = (theme) => 
{
  return (
  {
    form: {margin: 'auto', width: '90%'},
    root: {margin: 'auto'},
    stepper: {backgroundColor: 'lightblue', width: '90%', margin: 'auto', borderRadius: '1.2rem'},
    button: {marginRight: theme.spacing.unit},
    confirmation: {marginTop: theme.spacing.unit, marginBottom: theme.spacing.unit},
    instructions: {margin: '1.2rem', fontSize: '1.5rem'},
    divider: {height: '1.5rem'}
  });
}

export default withStyles(styles)(AdminStepper);