use std::collections::HashSet;
type InputType = Vec<String>;

#[aoc_generator(day3)]
pub fn parse_input(buf :&str) -> InputType
{
    buf.lines().map(|s| {s.to_string()}).collect()
}

#[aoc(day3, part1)]
pub fn part1(_input : &InputType) -> usize
{
    
    0
}

#[aoc(day3, part2)]
pub fn part2(_input : &InputType) -> usize
{
    0
}

#[cfg(test)]
mod tests 
{
    use super::*;

    const TEST_DATA: &str = 
"";

    #[test]
    pub fn part1_test() 
    {
        assert_eq!(part1(&parse_input(TEST_DATA)), 0)
    }

    #[test]
    pub fn part2_test() 
    {
        assert_eq!(part2(&parse_input(TEST_DATA)), 0)
    }
}
