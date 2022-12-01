// Generator function is run on the input to put it in a shared form, then passed to both parts
// You could ignore this and do the parsing within the parts themselves
// I use this inputtype to quickly change types across all functions, part of my attempts to leaderboard
type InputType = Vec<Vec<usize>>;

#[aoc_generator(day1)]
pub fn parse_input(buf :&str) -> InputType
{
    buf.split("\n\n")
        .map(|rations| {
            rations
                .split('\n')
                .map(|item| item.parse().expect("Unable to parse number"))
                .collect()
        })
        .collect()
}

#[aoc(day1, part1)]
pub fn part1(_input : &InputType) -> usize
{
    let mut vec = _input
        .iter()
        .map(|items| items
            .iter()
            .sum()
        )
        .collect::<Vec<usize>>();
    vec.sort(); 

    vec.pop().unwrap()
}

#[aoc(day1, part2)]
pub fn part2(_input : &InputType) -> usize
{
    let mut vec = _input
        .iter()
        .map(|items| items
            .iter()
            .sum()
        )
        .collect::<Vec<usize>>();
    vec.sort();
    vec.iter().rev().take(3).sum()
}

#[cfg(test)]
mod tests 
{
    use super::*;

    const TEST_DATA: &str = 
"1000
2000
3000

4000

5000
6000

7000
8000
9000

10000";

    #[test]
    pub fn part1_test() 
    {
        assert_eq!(part1(&parse_input(TEST_DATA)), 24000)
    }

    #[test]
    pub fn part2_test() 
    {
        assert_eq!(part2(&parse_input(TEST_DATA)), 45000)
    }
}