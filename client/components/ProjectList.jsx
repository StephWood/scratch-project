import React, { Component, useState, useEffect } from 'react';
import { playTimer, stopTimer } from '../actions/actions';
import { useDispatch } from 'react-redux';

const ProjectList = (props) => {
  const { projectName, projectId, categoryName, categoryId, startTimer, endTimer, user }  = props;

  const dispatch = useDispatch();

  // using all of these because reducer is expecting all of them
  const [buttonStatus, setButtonStatus] = useState('▶️');
  const [isClicked, setIsClicked] = useState(false);
  // const [localStartTimer, setIsLocalStartTimer] = useState(0);
  // const [localEndTimer, setIsLocalTimer] = useState(0);

  function handleOnClickPlay() {
    setIsClicked(true)
    setButtonStatus('||');
  }

  function handleOnClickStop() {
    setButtonStatus('▶️');

  }

  function fetchStop() {
    const reqData = {
      time_spent: Date.now() - startTimer,
      updated_at: new Date().toString(),
      category_id: categoryId,
      project_id: projectId,
      user_id: user._id,
    };
    // fetch('/api/', {
    //   method: 'POST',
    //   header: { 'content-type': 'application/json' },
    //   body: JSON.stringify(reqData),
    // }).then((data) => {
      //dummy data
      const payload = {};
          payload.timerActivity = reqData
      return payload;
      
    // });
  }

  useEffect(() => {
    if (isClicked === true && buttonStatus === '||' && startTimer === 0) {
      let payload = {
        currentProjectName: projectName,
        currentCategoryName: categoryName,
        currentProjectId: projectId,
        currentCategoryId: categoryId,
      };
      dispatch(playTimer(payload));
      setIsClicked(false);
    } else if (isClicked === true && buttonStatus === '||' && startTimer !== 0) {
      let payloadStop = fetchStop();
      console.log(payloadStop)
      dispatch(stopTimer(payloadStop));
      let payload = {
        currentProjectName: projectName,
        currentCategoryName: categoryName,
        currentProjectId: isProjectId,
        currentCategoryId: categoryId,
      };
      dispatch(playTimer(payload));
      setIsClicked(false);
    } else if(isClicked === true && buttonStatus === '▶️' && startTimer !== 0){
      let payloadStop = fetchStop();
      console.log(payloadStop)
      dispatch(stopTimer(payloadStop));
      setIsClicked(false);
    }
  });

  return (
    <div className="project">
      {projectName}
      <button className="stop" onClick={() => {buttonStatus === '||' ? handleOnClickStop() : handleOnClickPlay()}}>
          {buttonStatus}
      </button>
    </div>
  );
};

export default ProjectList;