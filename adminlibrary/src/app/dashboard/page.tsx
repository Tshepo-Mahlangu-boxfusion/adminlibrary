'use client'

import React from 'react';
import { useStyles } from './styles/styles';

const Dashboard = () => {
const {styles} =useStyles();
  return (
    <div className={styles.main}>
      <div className={styles.cardBox}>
                            <div className="card">
                                <div>
                                    <div className="numbers">
                                     200
                                    </div>
                                    <div className="cardName">Daily Views</div>
                                </div>
                                <div className="iconBx">
                                  <i className="fa-solid fa-eye"></i>
                                </div>
                            </div>
                          <div className="card">
                                <div>
                                    <div className="numbers">
                                     50
                                    </div>
                                    <div className="cardName">Registered users</div>
                                </div>
                                <div className="iconBx">
                                  <i className="fa-solid fa-person"></i>
                                </div>
                            </div>
                             
                            <div className="card">
                                <div>
                                    <div className="numbers">
                                     48
                                    </div>
                                    <div className="cardName">Orders</div>
                                </div>
                                <div className="iconBx">
                                   <i className="fa-solid fa-utensils"></i>
                                </div>
                            </div>
                         
                             <div className="card">
                                <div>
                                    <div className="numbers">
                                    1000
                                    </div>
                                    <div className="cardName">Earnings</div>
                                </div>
                                <div className="iconBx">
                                  <i className="fa-solid fa-coins"></i>
                                </div>
                            </div>

                            
                        </div>
                     </div>

  )
}

export default Dashboard