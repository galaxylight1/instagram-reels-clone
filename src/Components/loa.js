import React from 'react';

function loa() {
    const callback = (entries)=> {
        entries.forEach(element => {
            console.log(element);
        });
    }
    const observer = new IntersectionObserver(callback, { threshold: 0.9 });
    return ( 
        <div>
            
        </div>
    );
}