import React, { Component } from 'react';
import client from "../css/images/clients/client1.png";

class Testimonial extends Component {
    render() {
        return (
            <div class="testimonial">
                <div class="testimonial-owner">
                    <figure>
                        <img src={client} alt="client" />
                    </figure>

                    <div>
                        <h4 class="testimonial-title">john Smith</h4>
                        <span>CEO &amp; Founder</span>
                    </div>
                </div>

                <blockquote>
                    <p>Lorem ipsum dolor sit amet, consectetur elitad adipiscing Cras non placerat mi.</p>
                </blockquote>
            </div>
        );
    }
}

export default Testimonial;