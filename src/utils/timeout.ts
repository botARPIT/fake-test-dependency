// This is a timeout function written to implement the base of backpressure

/* What this timeout function should do?
It should accept a async operation, typically an http request
Start a timer when it arrives
If timer is up, reject the request upfront
If not, return the value of request (if rejected or resolved)
*/

function timeout<T>(request: Promise<T>, durationInMs: number): Promise<T> {
    const timeoutPromise = new Promise<T>((_, reject) => {
        const timer = setTimeout(() => {
            reject(new Error("Request rejected due to timeout"))
        }, durationInMs)



    })
    return Promise.race([
        timeoutPromise,
        request
    ])
}