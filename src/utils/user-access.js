export function getNextStatus(currentStatus) {
    return currentStatus === 'restricted' ? 'active' : 'restricted'

}