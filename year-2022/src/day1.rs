type InputType = Vec<usize>;

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
        .map(|items: Vec<usize>| items
            .iter()
            .sum()
        )
        .collect::<Vec<usize>>()
}

#[aoc(day1, part1)]
pub fn part1(_input : &InputType) -> usize
{
    let mut vec = _input.clone();
    vec.sort_by(|a, b| b.cmp(a));
    *vec.first().unwrap()
}

#[aoc(day1, part2)]
pub fn part2(_input : &InputType) -> usize
{
    let mut vec = _input.clone();
    vec.sort_by(|a, b| b.cmp(a));
    vec.iter().take(3).sum()
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