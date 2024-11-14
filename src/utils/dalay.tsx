export async function dalay(time: number) {
    return await new Promise(resolve => setTimeout(resolve, time));
}