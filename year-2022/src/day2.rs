type InputType = Vec<(i8, i8)>;

#[aoc_generator(day2)]
pub fn parse_input(buf :&str) -> InputType
{

    buf.lines()
        .map(|round| {
            let (_opponent, _me) = round.split_once(' ').unwrap();
            let opponent_score:i8;
            let mut p1_score:i8;
            let mut p2_score:i8;
            match _opponent {
                "A" => opponent_score = 1,
                "B" => opponent_score = 2,
                "C" => opponent_score = 3,
                _ => opponent_score = 0
            }
            match _me {
                "X" => p1_score = 1,
                "Y" => p1_score = 2,
                "Z" => p1_score = 3,
                _ => p1_score = 0
            }
            match round {
                "A X" => p2_score = 3,
                "B X" => p2_score = 1,
                "C X" => p2_score = 2,
                "A Y" => p2_score = 1,
                "B Y" => p2_score = 2,
                "C Y" => p2_score = 3,
                "A Z" => p2_score = 2,
                "B Z" => p2_score = 3,
                "C Z" => p2_score = 1,
                _ => p2_score = 0
            }
            let p1_result= p1_score - opponent_score;
            if p1_result == 0 {
                p1_score += 3;
            } else if p1_result == 1 || p1_result == -2 {
                p1_score += 6;
            }
            let p2_result = p2_score - opponent_score;
            if p2_result == 0 {
                p2_score += 3;
            } else if p2_result == 1 || p2_result == -2 {
                p2_score += 6;
            }
            
            (p1_score, p2_score)
        })
        .collect()
}

#[aoc(day2, part1)]
pub fn part1(_input : &InputType) -> u32
{
    _input.iter().map(|scores| scores.0).fold(0u32, |a, b| a + b as u32)

}

#[aoc(day2, part2)]
pub fn part2(_input : &InputType) -> u32
{
    _input.iter().map(|scores| scores.1).fold(0u32, |a, b| a + b as u32)
}

#[cfg(test)]
mod tests 
{
    use super::*;

    const TEST_DATA: &str = 
"A Y
B X
C Z";

    #[test]
    pub fn part1_test() 
    {
        assert_eq!(part1(&parse_input(TEST_DATA)), 15)
    }

    #[test]
    pub fn part2_test() 
    {
        assert_eq!(part2(&parse_input(TEST_DATA)), 12)
    }
}
